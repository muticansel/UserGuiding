import React, { useState, useEffect, useRef } from "react";
import './App.css';

function App() {
  const [challangeText, setChallengeText] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);

  const timerInterval = useRef(null);

  useEffect(() => {
    setChallengeText(createRandomString());
    createTimer();
  }, []);

  const createRandomString = () => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const inputSubmitted = (e) => {
    const key = e.keyCode || e.which;
    if (key === 13) {
      setScore(guess === challangeText ? score + 1 : score - 1);
      setChallengeText(createRandomString());
      setGuess("");
      clearInterval(timerInterval.current);
      setTimer(10);
      createTimer();
    }
  };

  const createTimer = () => {
    timerInterval.current = setInterval(() => {
      setTimer((currentTimer) => {
        if (currentTimer <= 0) {
          setChallengeText(createRandomString());
          setScore((currentScore) => currentScore - 1);
          return 10;
        }
        return currentTimer - 1;
      });
    }, 1000);
  };

  return (
    <div className="App">
      <p>Challenge: {challangeText}</p>
      <input
        onChange={(e) => setGuess(e.target.value)}
        value={guess}
        onKeyPress={(e) => inputSubmitted(e)}
      ></input>

      <p>SCORE: {score}</p>
      <p>TİMER: {timer}</p>

      <p></p>
    </div>
  );
}

export default App;
