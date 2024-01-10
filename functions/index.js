/*
 * https://firebase.google.com/docs/functions
 */

const {onCall} = require("firebase-functions/v2/https");
const {onSchedule} = require("firebase-functions/v2/scheduler");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {onDocumentUpdated} = require("firebase-functions/v2/firestore");

const logger = require("firebase-functions/logger");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer')

const admin = require("firebase-admin");
const FieldValue = admin.firestore.FieldValue;
admin.initializeApp();

const db = admin.firestore();

exports.newHelpdeskProblem = onDocumentCreated("problems/{docId}", (event) => {

    const smtpTransport = nodemailer.createTransport({
        pool: true,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true, // use TLS
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASS,
        }
    });

    const snapshot = event.data;

    if (!snapshot) {
        logger.log("No data associated with the event");
        return;
    }

    const data = snapshot.data();
    const problemText = data.problem;
    const place = data.place;
    const reporter = data.reporter;
    const assigned = data.assigned;

    const mailOptions = {
        from: process.env.MAIL_SENDER,
        to: assigned, // + "@delta-skola.cz"
        subject: 'Nový problém na Helpdesku',
        html: `Problém: <b>${problemText}</b> v umístění <b>${place}</b>. Nahlášeno uživatelem <i>${reporter}</i> a <b>vy</b> jste byli přiděleni. <a href="${process.env.APP_URL}">Přejít do portálu Delta Homepage</a>`
    }

    smtpTransport.sendMail(mailOptions, (error, response) => error && logger.log(error));
})

// works
exports.problemUpdated = onDocumentUpdated("problems/{docId}", (event) => {
    const newData = event.data.after.data();

    const smtpTransport = nodemailer.createTransport({
        pool: true,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true, // use TLS
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASS,
        }
    });

    const mailOptions = {
        from: process.env.MAIL_SENDER,
        to: newData.reporter,
        subject: 'Helpdesk',
        html: `Váš problém <b>${newData.problem}</b> na Helpdesku nahlášený ${newData.datetime} byl označen jako <b>${newData.state === 'done' ? "vyřešený" : "in progress"}</b>. <a href="${process.env.APP_URL}">Přejít do portálu Delta Homepage</a>`
    }

    smtpTransport.sendMail(mailOptions, (error, response) => error && logger.log(error));
})

exports.sendAlerts = onSchedule("every monday 08:00", async (event) => {
    const problems = {}

    const smtpTransport = nodemailer.createTransport({
        pool: true,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true, // use TLS
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASS,
        }
    });

    const col = db.collection('problems');

    col.get().then(snapshot => {
        snapshot.forEach(doc => {
            const problem = doc.data()

            if(!(problem.assigned in problems)) problems[problem.assigned] = []
            problems[problem.assigned].push(problem)
        })

        for(const [k, v] of Object.entries()) {

            const mailOptions = {
                from: process.env.MAIL_SENDER,
                to: k,
                subject: 'Helpdesk',
                html: `Máte stále nevyřešené problémy: ${v.map(p => p.problem).filter(p => p !== 'done').map(p => '<b>'+p+'</b>').join(', ')}. <a href="${process.env.APP_URL}">Přejít do portálu Delta Homepage</a>`
            }

            smtpTransport.sendMail(mailOptions, (error, response) => error && logger.log(error));
        }
    })
})

exports.addCredit = onRequest(async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.rawBody, sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const paymentIntentSucceeded = event.data.object;
            const user = paymentIntentSucceeded.client_reference_id;
            const amount = paymentIntentSucceeded.amount_total;
            await db.collection('users').doc(`${user}`).update({ credit: FieldValue.increment(amount) });
            logger.log(user, amount)
            break;
        default:
            response.status(400).send(`Unhandled event type ${event.type}`);
            break;
    }

    response.status(200).send();
});