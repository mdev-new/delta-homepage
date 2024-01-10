/*
 * https://firebase.google.com/docs/functions
 */

const {onCall} = require("firebase-functions/v2/https");
const {onSchedule} = require("firebase-functions/v2/scheduler");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

const logger = require("firebase-functions/logger");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer')

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

const APP_URL = process.env.APP_URL;

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

exports.newHelpdeskProblem = onDocumentCreated("problems/{docId}", (event) => {

    const snapshot = event.data;
    if (!snapsot) {
        console.log("No data associated with the event");
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
        html: `Problém: <b>${problemText}</b> v umístění <b>${place}</b>. Nahlášeno uživatelem <i>${reporter}</i> a <b>vy</b> jste byli přiděleni. <a href="${global.frontendPublic}">Přejít do portálu Delta Homepage</a>`
    }
    smtpTransport.sendMail(mailOptions, (error, response) => error && console.log(error));
})

//exports.problemUpdated = onDocumentUpdated("problems/{docId}", (event) => {
//})

//exports.sendAlerts = onSchedule("every monday 08:00", async (event) => {
//  const assignedPersons = new Set();
//  const problems = [] // problems per assigned person
//})

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