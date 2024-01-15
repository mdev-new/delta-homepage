import React, { Component } from "react";
import "./styles.css";

import firebase from 'firebase/compat/app'

// lore
// pruvodce - globglobgabgalab
// globglobgabgalab ma rad knihy a zamkne te ve sklepe
// dokud neopises vsechno co ti naserviruje (budes low budget mnich)

// za 100% spravne cviceni - sbirani gifu (misto hvezdicek jako v mb), gify na oslavu, atd

// todo:
// [ ] klasifikace
// [ ] bez mezer
// [ ] pozadu opis
// [ ] opis x-krat

// todo admin panel na jednoduchou spravu cviceni a zobrazovani napsanych cviceni

// todo system prav

const gifs = [
  "https://media1.tenor.com/m/iEIVpEs-YhgAAAAC/weird-shwabble.gif",
  "https://media1.tenor.com/m/SAeLxoLstAMAAAAd/globonicle-globglogabgalab.gif",
  "https://media1.tenor.com/m/MuOjvhV0lcIAAAAd/i-love-books-treasure-trove.gif",
  "https://media1.tenor.com/m/Th0EqoqwoJMAAAAd/globglog-bookworm.gif"
]

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

  startLesson = () => {
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

    this.props.functions.httpsCallable('getLesson')().then(text => {
      const t_obj = text?.data
      const txt = t_obj?.text

      this.setState({
        text: txt || null,
        words: txt?.split(" "),
        lesson: t_obj
      });

      if(t_obj.graded) alert('Pozor! Klasifikace!'); // todo klasifikace schvaluje ucitel
    });
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
          lessonId: this.props.user.typing_lesson,
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

    if (!started) {
      return (
        <div className="container">
          <p className="text">{this.props.user.typing_gifs.length} gifů - {Math.floor(this.props.user.typing_gifs.length / 5)} jednišek</p>
          <button className="start-btn" onClick={this.startLesson}>
            Začít psát
          </button>
        </div>
      );
    }

    if (!text) return (
      <div className="container">
        <p className="text">{this.props.user.typing_gifs.length} gifů - {this.props.user.typing_gifs.length / 5} jednišek</p>
        <p className="p">Načítám...<br />Pokud to trvá dlouho, asi se někde stala chyba :(</p>
      </div>
    );

    if (completed) {
      const mistakes = wordStates.filter(f => f === false).length;

      return (
        <div className="container">
          <p className="text">{this.props.user.typing_gifs.length} gifů - {this.props.user.typing_gifs.length / 5} jednišek</p>
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
          <button className="start-btn" onClick={this.startLesson}>
            Další cvičení
          </button>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          <p className="text">{this.props.user.typing_gifs.length} gifů - {this.props.user.typing_gifs.length / 5} jednišek</p>
          <h4>Opiš {lesson.repeat}x.</h4>
          <progress value={progress} max="100" />
          <p className="text">
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
          </p>
          <input
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
        </div>
      </div>
    );
  }
}

export default Writing;
