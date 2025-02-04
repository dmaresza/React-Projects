import { useState } from 'react'
import { languages } from "./languages"
import { clsx } from "clsx"
import { getFarewellText, getNewWord } from './utils'

export default function App() {

  // State values
  const [currentWord, setCurrentWord] = useState(getNewWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameOver = isGameWon || isGameLost

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  // DOM Elements
  const languageElements = languages.map((language, index) => {
    const className = clsx("chip", { "lost": index < wrongGuessCount })

    return <span key={language.name} className={className} style={
      {
        backgroundColor: language.backgroundColor,
        color: language.color
      }
    }>
      {language.name}
    </span>
  })

  const letterElements = currentWord.split("").map((letter, index) =>
    <span key={index}>{guessedLetters.includes(letter) && letter.toUpperCase()}</span>)

  const keyboard = alphabet.split("").map(letter => {
    const correctGuess = guessedLetters.includes(letter) && currentWord.includes(letter)
    const incorrectGuess = guessedLetters.includes(letter) && !currentWord.includes(letter)
    const className = clsx({ correct: correctGuess }, { incorrect: incorrectGuess })
    return <button
      key={letter}
      onClick={() => guessLetter(letter)}
      className={className}
      disabled={isGameOver}
      aria-disabled={guessedLetters.includes(letter)}
      aria-label={`Letter ${letter}`}
    >
      {letter.toUpperCase()}
    </button>
  })

  // Functions
  function guessLetter(letter) {
    setGuessedLetters(prevGuesses => (
      prevGuesses.includes(letter) ? prevGuesses : [...prevGuesses, letter]))
  }

  function newGame() {
    setGuessedLetters([])
    setCurrentWord(getNewWord())
  }

  function renderGameStatus() {
    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    } else if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )
    } else if (isLastGuessIncorrect) {
      return (
        <h2>{getFarewellText(languages[wrongGuessCount - 1].name)}</h2>
      )
    } else {
      return null
    }
  }

  // App return
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section
        aria-live="polite"
        role="status"
        className={clsx("status", { "won": isGameWon }, { "lost": isGameLost }, { "incorrect": !isGameOver && isLastGuessIncorrect })}
      >
        {renderGameStatus()}
      </section>
      <section className="languages">
        {languageElements}
      </section>
      <section className="guess-word">
        {letterElements}
      </section>
      <section
        className="sr-only"
        aria-live="polite"
        role="status"
      >
        <p>
          {currentWord.includes(lastGuessedLetter) ?
            `Correct! The letter ${lastGuessedLetter} is in the word.` :
            `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {languages.length - wrongGuessCount - 1} attempts left.
        </p>
        <p>Current word: {currentWord.split("").map(letter =>
          guessedLetters.includes(letter) ? letter : "blank").join(" ")}</p>
      </section>
      <section className="keyboard">
        {keyboard}
      </section>
      {isGameOver && <button className="new-game" onClick={() => newGame()}>New Game</button>}
    </main>
  )
}