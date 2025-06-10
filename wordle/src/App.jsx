import { useState, useEffect, useRef, useCallback } from 'react';
import Guess from './Guess';
import { getNewWord } from './words';

export default function App() {

  // State values 
  const [currentWord, setCurrentWord] = useState(() => getNewWord());
  const [currentGuess, setCurrentGuess] = useState([]);
  const [prevGuesses, setPrevGuesses] = useState([]);
  const [guessCount, setGuessCount] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const isGameWon = prevGuesses.length > 0 ? prevGuesses[prevGuesses.length - 1].join("") === currentWord : false;
  const isGameLost = guessCount > 0 ? guessCount > 5 && prevGuesses[5].join("") != currentWord : false;
  const isGameOver = isGameWon || isGameLost

  // Other values
  const alphabet = "qwertyuiopasdfghjklzxcvbnm";
  const quotes = ['Genius', 'Magnificent', 'Impressive', 'Splendid', 'Great', 'Phew'];

  const backspaceRef = useRef(backspace);
  const submitRef = useRef(submit);
  const guessLetterRef = useRef(guessLetter);

  useEffect(() => {
    backspaceRef.current = backspace;
    submitRef.current = submit;
    guessLetterRef.current = guessLetter;
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      const key = event.key;
      if (key == 'Backspace') backspaceRef.current();
      else if (key == 'Enter') submitRef.current();
      else if (alphabet.includes(key)) guessLetterRef.current(key);
    };
    if (!isGameOver) window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isGameOver]);

  // DOM Elements
  const guessElements =
    <>
      <Guess currentGuess={currentGuess} guessCount={guessCount} id={0} prevGuesses={prevGuesses} currentWord={currentWord} />
      <Guess currentGuess={currentGuess} guessCount={guessCount} id={1} prevGuesses={prevGuesses} currentWord={currentWord} />
      <Guess currentGuess={currentGuess} guessCount={guessCount} id={2} prevGuesses={prevGuesses} currentWord={currentWord} />
      <Guess currentGuess={currentGuess} guessCount={guessCount} id={3} prevGuesses={prevGuesses} currentWord={currentWord} />
      <Guess currentGuess={currentGuess} guessCount={guessCount} id={4} prevGuesses={prevGuesses} currentWord={currentWord} />
      <Guess currentGuess={currentGuess} guessCount={guessCount} id={5} prevGuesses={prevGuesses} currentWord={currentWord} />
    </>

  const keyboardElements = alphabet.split("").map(letter => {
    let className = "";
    const tempArray = prevGuesses.flat();
    if (tempArray.some((char, index) => currentWord[index % 5] === char && char === letter)) {
      className = "correct";
    }
    else if (guessedLetters.includes(letter) && currentWord.includes(letter)) {
      className = "close";
    }
    else if (guessedLetters.includes(letter) && !currentWord.includes(letter)) {
      className = "wrong";
    }
    return < button style={{ gridArea: { letter } }} key={letter} className={className} disabled={isGameOver} onClick={() => guessLetter(letter)
    }> {letter.toUpperCase()}</button >
  });

  // Functions
  function guessLetter(letter) {
    if (currentGuess.length < 5) {
      setCurrentGuess(prevGuess => [...prevGuess, letter]);
    }
  };

  function submit() {
    if (currentGuess.length === 5) {
      setGuessCount(prevCount => prevCount + 1);
      setPrevGuesses(guesses => [...guesses, currentGuess]);
      setGuessedLetters(prevLetters => [...prevLetters, ...currentGuess.filter(letter => !prevLetters.includes(letter))]);
      setCurrentGuess([]);
    }
  };

  function backspace() {
    if (currentGuess.length > 0) {
      setCurrentGuess(prevGuess => {
        const tempArray = [...prevGuess];
        tempArray.pop();
        return tempArray;
      });
    }
  };

  function newGame() {
    setCurrentWord(getNewWord());
    setCurrentGuess([]);
    setPrevGuesses([]);
    setGuessCount(0);
    setGuessedLetters([]);
  }

  // App return
  return (
    <main>
      <h1>Wordle</h1>
      <p><b>How to play: </b>Guess the secret 5-letter word in 6 tries!
        If your guess has the same letter in the same position as the secret word, the letter will be highlighted green.
        If a guessed letter is in the secret word but in a different position, it will be highlighted yellow.</p>
      <section className="guesses">
        {guessElements}
      </section>
      <section className={isGameOver ? "status-section" : "status"}>
        {isGameWon ? quotes[guessCount - 1].toUpperCase() : isGameLost ? currentWord.toUpperCase() : ""}
      </section>
      <section className="keyboard">
        {keyboardElements}
        <button disabled={isGameOver} onClick={() => submit()}>↵</button>
        <button disabled={isGameOver} onClick={() => backspace()}>⌫</button>
      </section>
      {isGameOver && <button className="new-game" onClick={() => newGame()}>Play Again</button>}
    </main>
  );
};