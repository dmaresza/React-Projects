import { useState } from 'react'
import Guess from "./Guess"
import { getNewWord } from './words'

export default function App() {

  // State values 
  const [currentWord, setCurrentWord] = useState(() => getNewWord())
  const [currentGuess, setCurrentGuess] = useState([])
  const [prevGuesses, setPrevGuesses] = useState([])
  const [guessCount, setGuessCount] = useState(0)
  const [guessedLetters, setGuessedLetters] = useState([])

  // Derived values
  const isGameWon = prevGuesses.length > 0 ? prevGuesses[prevGuesses.length - 1].join("") === currentWord : false
  const isGameLost = guessCount > 0 ? guessCount > 5 && prevGuesses[5].join("") != currentWord : false

  // Other values
  const alphabet = "qwertyuiopasdfghjklzxcvbnm"

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
    let className = ""
    const tempArray = prevGuesses.flat()
    if (tempArray.some((char, index) => currentWord[index % 5] === char && char === letter)) {
      className = "correct"
    }
    else if (guessedLetters.includes(letter) && currentWord.includes(letter)) {
      className = "close"
    }
    else if (guessedLetters.includes(letter) && !currentWord.includes(letter)) {
      className = "wrong"
    }
    return < button key={letter} className={className} disabled={isGameWon || isGameLost} onClick={() => guessLetter(letter)
    }> {letter.toUpperCase()}</button >
  }
  )

  // Functions
  function guessLetter(letter) {
    if (currentGuess.length < 5) {
      setCurrentGuess(prevGuess => [...prevGuess, letter])
    }
  }

  function submit() {
    if (currentGuess.length === 5) {
      setGuessCount(prevCount => prevCount + 1)
      setPrevGuesses(guesses => [...guesses, currentGuess])
      setGuessedLetters(prevLetters => [...prevLetters, ...currentGuess.filter(letter => !prevLetters.includes(letter))])
      setCurrentGuess([])
    }
  }

  function backspace() {
    if (currentGuess.length > 0) {
      setCurrentGuess(prevGuess => {
        const tempArray = [...prevGuess]
        tempArray.pop()
        return tempArray
      })
    }
  }

  function newGame() {
    setCurrentWord(getNewWord())
    setCurrentGuess([])
    setPrevGuesses([])
    setGuessCount(0)
    setGuessedLetters([])
  }

  // App return
  return (
    <main>
      <h1>Wordle</h1>
      <p><b>How to play: </b>Guess the 5-letter word in 6 tries!
        If your guess has the same letter in the same position as the secret word, the letter will be highlighted green.
        If the letter is in the word but in a different position, it will be highlighted yellow.<br></br><br></br>
        (Note: Keyboard functionality is currently not enabled. Please click on each letter to select it)</p>
      <section className="guesses">
        {guessElements}
      </section>
      <section className={(isGameWon || isGameLost) ? "status-section" : "status"}>
        {isGameWon ? "You win! 🎉" : isGameLost ? currentWord.toUpperCase() : ""}
      </section>
      <section className="keyboard">
        {keyboardElements}
        <button disabled={isGameWon || isGameLost} onClick={() => submit()}>↵</button>
        <button disabled={isGameWon || isGameLost} onClick={() => backspace()}>⌫</button>
      </section>
      {(isGameWon || isGameLost) && <button className="new-game" onClick={() => newGame()}>Play Again</button>}
    </main>
  )
}

// Genius
// Magnificent
// Impressive
// Splendid
// Great
// Phew