import React, { Component } from "react";
import "./styles.css";

class Writing extends Component {
  state = {
    text: "",
    inputValue: "",
    lastLetter: "",
    words: [],
    completedWords: [],
    wordStates: [],
    completed: false,
    startTime: undefined,
    timeElapsed: 0,
    wpm: 0,
    started: false,
    progress: 0
  };

  setText = () => {
    const text = "Hello, world."; // todo: get next lesson from db
    const words = text.split(" ");

    this.setState({
      text: text,
      words: words,
      completedWords: []
    });
  };

  startLesson = () => {
    this.setText();

    this.setState({
      started: true,
      completed: false,
      progress: 0,
      wpm: 0
    });
  };

  handleChange = e => {
    const { words, completedWords } = this.state;
    const inputValue = e.target.value;
    const lastLetter = inputValue[inputValue.length - 1];

    if(inputValue.length == 1 && this.state.progress == 0) {
      console.log("fired!", inputValue)
      this.setState({
        startTime: Date.now(),
        timeElapsed: 0
      });
    }

    const currentWord = words[0];

    // if space or '.', check the word
    if (lastLetter === " " || lastLetter === ".") {

      const newWords = [...words.slice(1)];
      const newCompletedWords = [...completedWords, currentWord];

      // Get the total progress by checking how much words are left
      const progress = (newCompletedWords.length / (newWords.length + newCompletedWords.length)) * 100;
      this.setState({
        words: newWords,
        completedWords: newCompletedWords,
        inputValue: "",
        completed: newWords.length === 0,
        progress: progress,
        wordStates: [...this.state.wordStates, inputValue.trim() === currentWord]
      });

    } else {
      this.setState({
        inputValue: inputValue,
        lastLetter: lastLetter
      });
    }

    this.calculateWPM();
  };

  calculateWPM = () => {
    const { startTime, completedWords } = this.state;
    const now = Date.now();
    const diff = (now - startTime) / 1000 / 60; // 1000 ms / 60 s

    // every word is considered to have 5 letters
    // so here we are getting all the letters in the words and divide them by 5
    // "my" shouldn't be counted as same as "deinstitutionalization"
    const wordsTyped = Math.ceil(
      completedWords.reduce((acc, word) => (acc += word.length), 0) / 5
    );

    const wpm = Math.ceil(wordsTyped / diff);

    this.setState({
      wpm: wpm,
      timeElapsed: diff
    });
  };

  render() {
    const {
      text,
      inputValue,
      completedWords,
      wpm,
      timeElapsed,
      started,
      completed,
      progress,
      wordStates
    } = this.state;

    if (!started)
      return (
        <div className="container">
          <button className="start-btn" onClick={this.startLesson}>
            Začít psát
          </button>
        </div>
      );

    if (!text) return <p className="p">Loading...</p>;

    if (completed) {
      return (
        <div className="container">
          <h2 className="h2">
            Your WPM is <strong>{wpm}</strong>
          </h2>
          <button className="start-btn" onClick={this.startLesson}>
            Další cvičení
          </button>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          {/*<div className="wpm">
            <strong>WPM: </strong>
            {wpm}
            <br />
            <strong>Time: </strong>
            {Math.floor(timeElapsed * 60)}s
          </div>*/}
          <h4>Opiš.</h4>
          <progress value={progress} max="100" />
          <p className="text">
            {text.split(" ").map((word, w_idx) => {
              let highlight = "";
              let currentWord = false;

              // this means that the word is completed, so turn it green
              if (completedWords.length > w_idx) {
                highlight = wordStates[w_idx] ? "green" : "red";
              } else if (completedWords.length === w_idx) {
                currentWord = true;
              }

              return (
                <span
                  className={`word 
                                ${highlight} 
                                ${currentWord && "underline"}`}
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
