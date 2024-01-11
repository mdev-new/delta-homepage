import React, { Component } from "react";
import "./styles.css";

class Writing extends Component {
  state = {
    text: "",
    inputValue: "",
    lastLetter: "",
    words: [],
    completedWords: [],
    completed: false,
    startTime: undefined,
    timeElapsed: 0,
    wpm: 0,
    started: false,
    progress: 0
  };

  setText = () => {
    const text = "Hello world"; //texts[Math.floor(Math.random() * texts.length)]; // todo: get next lesson from db
    const words = text.split(" ");

    this.setState({
      text: text,
      words: words,
      completedWords: []
    });
  };

  startGame = () => {
    this.setText();

    this.setState({
      started: true,
      startTime: Date.now(),
      completed: false,
      progress: 0
    });
  };

  handleChange = e => {
    const { words, completedWords } = this.state;
    const inputValue = e.target.value;
    const lastLetter = inputValue[inputValue.length - 1];

    const currentWord = words[0];
    console.log(currentWord, "currentWord");

    // if space or '.', check the word
    if (lastLetter === " " || lastLetter === ".") {
      // check to see if it matches to the currentWord
      // trim because it has the space
      if (inputValue.trim() === currentWord) {
        // remove the word from the wordsArray
        // cleanUp the input
        const newWords = [...words.slice(1)];
        console.log(newWords, "newWords");
        console.log(newWords.length, "newWords.length");
        const newCompletedWords = [...completedWords, currentWord];
        console.log(newCompletedWords, "newCompletedWords");
        console.log("----------------");

        // Get the total progress by checking how much words are left
        const progress =
          (newCompletedWords.length /
            (newWords.length + newCompletedWords.length)) *
          100;
        this.setState({
          words: newWords,
          completedWords: newCompletedWords,
          inputValue: "",
          completed: newWords.length === 0,
          progress: progress
        });
      }
    } else {
      this.setState({
        inputValue: inputValue,
        lastLetter: lastLetter
      });
      console.log(this.state.inputValue, "this.state.inputValue");
      console.log(this.state.lastLetter, "this.state.lastLetter");
      console.log("================================");
    }

    this.calculateWPM();
  };

  calculateWPM = () => {
    const { startTime, completedWords } = this.state;
    const now = Date.now();
    const diff = (now - startTime) / 1000 / 60; // 1000 ms / 60 s
    console.log(now, "now");
    console.log(startTime, "startTime");
    console.log(diff, "diff");
    console.log("**************");

    // every word is considered to have 5 letters
    // so here we are getting all the letters in the words and divide them by 5
    // "my" shouldn't be counted as same as "deinstitutionalization"
    const wordsTyped = Math.ceil(
      completedWords.reduce((acc, word) => (acc += word.length), 0) / 5
    );
    console.log(completedWords, "completedWords");
    console.log(wordsTyped, "wordsTyped");
    console.log("+=+=+=+=+=+=");

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
      progress
    } = this.state;

    if (!started)
      return (
        <div className="container">
          <button className="start-btn" onClick={this.startGame}>
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
          <button className="start-btn" onClick={this.startGame}>
            Další cvičení
          </button>
        </div>
      );
    }

    return (
      <div>
        <div className="wpm">
          <strong>WPM: </strong>
          {wpm}
          <br />
          <strong>Time: </strong>
          {Math.floor(timeElapsed * 60)}s
        </div>
        <div className="container">
          <h4>Type the text below</h4>
          <progress value={progress} max="100" />
          <p className="text">
            {text.split(" ").map((word, w_idx) => {
              let highlight = false;
              let currentWord = false;

              // this means that the word is completed, so turn it green
              if (completedWords.length > w_idx) {
                highlight = true;
              }

              if (completedWords.length === w_idx) {
                currentWord = true;
              }

              return (
                <span
                  className={`word 
                                ${highlight && "green"} 
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
            onPaste={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            autocomplete="off"
            value={inputValue}
            // autoFocus={started ? 'true' : 'false'}
            autoFocus={true}
          />
        </div>
      </div>
    );
  }
}

export default Writing;
