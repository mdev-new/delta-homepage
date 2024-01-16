import React, { Component } from "react";
import "./styles.css";

import loading from '../loading.svg';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  Typography
} from '@mui/joy'

import firebase from 'firebase/compat/app'

// lore
// pruvodce - globglobgabgalab
// globglobgabgalab ma rad knihy a zamkne te ve sklepe
// dokud neopises vsechno co ti naserviruje (budes low budget mnich)

// za 100% spravne cviceni - sbirani gifu (misto hvezdicek jako v mb), gify na oslavu, atd

// todo admin panel na jednoduchou spravu cviceni a zobrazovani napsanych cviceni

// todo system prav

// todo if clicked next too fast the old text loads

const gifs = [
  "https://media1.tenor.com/m/iEIVpEs-YhgAAAAC/weird-shwabble.gif",
  "https://media1.tenor.com/m/SAeLxoLstAMAAAAd/globonicle-globglogabgalab.gif",
  "https://media1.tenor.com/m/MuOjvhV0lcIAAAAd/i-love-books-treasure-trove.gif",
  "https://media1.tenor.com/m/Th0EqoqwoJMAAAAd/globglog-bookworm.gif"
]

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Jednicek = () => <Typography>{randomInteger(0, 100) == 0 ? "jednišek" : randomInteger(0, 200) == 0 ? "jeptišek" : "jedniček"}</Typography>


class Writing extends Component {
  state = {
    lesson: null,
    text: "",
    inputValue: "",
    lastLetter: "",
    words: [],
    completedWords: [],
    wordStates: [],
    completed: false,
    startTime: undefined,
    started: false,
    progress: 0,
    totalText: ""
  };

  startLesson = async () => {
    this.setState({
      lesson: null,
      completedWords: [],
      started: true,
      completed: false,
      progress: 0,
      mistakes: 0,
      wordStates: [],
      text: null,
      words: [],
      totalText: ""
    });

    this.props.firestore
      .collection('typing_lessons')
      .doc(`${this.props.user.typing_lesson}`)
      .get()
      .then((docRef) => {
        const doc = docRef.data();
        const txt = doc?.text

        this.setState({
          text: txt || null,
          words: txt?.split(" "),
          lesson: doc
        });
      })
  };

  handleChange = async e => {
    const { words, completedWords, wordStates, progress, startTime, totalText } = this.state;
    const inputValue = e.target.value;
    const lastLetter = inputValue[inputValue.length - 1];

    // first letter of the lesson just typed, start the timer.
    if(inputValue.length == 1 && progress == 0) {
      this.setState({
        startTime: Date.now()
      });
    }

    const currentWord = words[0];

    if(inputValue === " " || inputValue === ".") {
      this.setState({
        totalText: totalText + inputValue,
        inputValue: "",
        lastLetter: ""
      });

      return;
    }

    // if space or '.', check the word
    if ((lastLetter === " " || lastLetter === ".")) {

      const newWords = [...words.slice(1)];
      const newCompletedWords = [...completedWords, currentWord];
      const newWordStates = [...wordStates, inputValue.trim() === currentWord];

      // Get the total progress by checking how much words are left
      const newProgress = (newCompletedWords.length / (newWords.length + newCompletedWords.length)) * 100;

      this.setState({
        totalText: totalText + inputValue,
        words: newWords,
        completedWords: newCompletedWords,
        inputValue: "",
        completed: newWords.length === 0,
        progress: newProgress,
        wordStates: newWordStates,
      });

      if(newProgress === 100 && newWords.length === 0) {
        let took = Math.round(Math.abs(new Date() - startTime) / 1000); // seconds
        await this.props.firestore.collection('typing_history').add({
          byUser: this.props.user.id,
          textWritten: totalText + inputValue,
          timeTaken: took,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        await this.props.functions.httpsCallable('setNextLesson')();
      }

    } else {
      this.setState({
        inputValue: inputValue,
        lastLetter: lastLetter
      });
    }
  };

  render() {
    const {
      text,
      inputValue,
      completedWords,
      started,
      completed,
      progress,
      wordStates,
      lesson
    } = this.state;

    if (this.props.user.typing_finished) return (
      <Card sx={{maxWidth: 650, margin: 'auto'}}>
        <CardContent sx={{alignContent: 'center', alignItems: 'center'}}>
          <h4>Teodor tě milosrdně propustil.</h4>
        </CardContent>
      </Card>
    );

    if (!started) {
      return (
        <Card sx={{maxWidth: 650, margin: 'auto'}}>
          <CardContent sx={{alignContent: 'center', alignItems: 'center'}}>
            <Typography>{this.props.user.typing_gifs.length} gifů - {Math.floor(this.props.user.typing_gifs.length / 5)} <Jednicek /></Typography>
          </CardContent>
          <CardActions>
            <Button onClick={this.startLesson}>
              Začít psát
            </Button>
          </CardActions>
        </Card>
      );
    }

    if (!text) return (
      <Card sx={{maxWidth: 650, margin: 'auto'}}>
        <CardContent sx={{alignContent: 'center', alignItems: 'center'}}>
          <Typography>{this.props.user.typing_gifs.length} gifů - {this.props.user.typing_gifs.length / 5} <Jednicek /> - cvičení #{lesson?.id + 1}</Typography>
          <Typography>Načítám...<img style={{position: 'relative', bottom: -5}} width={25} height={25} src={loading} /></Typography>
          <Typography>Pokud to trvá dlouho, asi se někde stala chyba :(</Typography>
        </CardContent>
      </Card>
    );

    if (completed) {
      const mistakes = wordStates.filter(f => f === false).length;

      return (
        <Card sx={{maxWidth: 650, margin: 'auto'}}>
          <CardContent sx={{alignContent: 'center', alignItems: 'center'}}>
          <Typography>{this.props.user.typing_gifs.length} gifů - {this.props.user.typing_gifs.length / 5} <Jednicek /> - cvičení #{lesson?.id + 1}</Typography>
          { mistakes !== 0 ? <>
            <h2 className="h2">
              Počet chyb: <strong>{mistakes} ({(mistakes / completedWords.length * 100).toFixed(1)}%)</strong>
            </h2>
            </>
            : <>
            <h2 className="h2">
              Bez chyby! Za odměnu tě pustím dál!
            </h2>
            <img width={500} height={400} src={gifs[randomInteger(0, 3)]} /> {/* Todo: tady ziskat ten random tenor gif a pridat ho do db */}
            </>
          }
          <Button onClick={this.startLesson}>
            Další cvičení
          </Button>
        </CardContent>
        </Card>
      );
    }

    return (
      <div>
        <Card sx={{maxWidth: 650, margin: 'auto'}}>
          <CardContent sx={{alignContent: 'center', alignItems: 'center'}}>
          <Typography>{this.props.user.typing_gifs.length} gifů - {this.props.user.typing_gifs.length / 5} <Jednicek /> - cvičení #{lesson?.id + 1}</Typography>
          {lesson?.graded && <Typography>!!!Klasifikace!!!</Typography>}
          <h4>Opiš {lesson?.repeat}x.</h4>
          <progress style={{maxWidth: 200}} value={progress} max="100" />
          <Typography>
            {text.split(" ").map((word, w_idx) => {
              let highlight = "";
              let currentWord = false;

              if (completedWords.length === w_idx) {
                currentWord = true;
              } else if (completedWords.length > w_idx) {
                highlight = wordStates[w_idx] ? "green" : "red";
              }

              return (
                <span
                  className={`word ${highlight} ${currentWord && "underline"}`}
                  key={w_idx}
                >
                  {word.split("").map((letter, l_idx) => {
                    const isCurrentWord = w_idx === completedWords.length;
                    const isWronglyTyped = letter !== inputValue[l_idx];
                    const shouldBeHighlighted = l_idx < inputValue.length;

                    return (
                      <span
                        className={`letter ${
                          isCurrentWord && shouldBeHighlighted
                            ? isWronglyTyped
                              ? "red"
                              : "green"
                            : ""
                        }`}
                        key={l_idx}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </Typography>
          <Input
            type="text"
            onChange={this.handleChange}
            onKeyDown={(event) => {
              if (event.which == 8 || event.which == 46) { 
                event.preventDefault();
              }
            }}
            onPaste={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            autocomplete="off"
            value={inputValue}
            autoFocus={true}
          />
        </CardContent>
        </Card>
      </div>
    );
  }
}

export default Writing;
