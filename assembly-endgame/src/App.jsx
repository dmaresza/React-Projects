import { useState } from 'react'
import { languages } from "./languages"
// import { clsx } from "clsx"

export default function App() {

  // State variables
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])

  // Derived variables
  const languageElements = languages.map(language => (
    <span key={language.name} className="language-chip" style={
      {
        backgroundColor: language.backgroundColor,
        color: language.color
      }
    }>
      {language.name}
    </span>
  ))

  const letterElements = currentWord.split("").map((letter, index) =>
    <span key={index}>{guessedLetters.includes(letter) && letter.toUpperCase()}</span>)

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const keyboard = alphabet.split("").map(letter => {
    const correctGuess = guessedLetters.includes(letter) && currentWord.includes(letter)
    const incorrectGuess = guessedLetters.includes(letter) && !currentWord.includes(letter)
    const className = correctGuess ? "correct" : (incorrectGuess ? "incorrect" : "")
    return <button
      key={letter}
      onClick={() => guessLetter(letter)}
      className={className}
    >
      {letter.toUpperCase()}
    </button>
  })

  // Functions
  function guessLetter(letter) {
    setGuessedLetters(prevGuesses => (
      prevGuesses.includes(letter) ? prevGuesses : [...prevGuesses, letter]))
  }

  // DOM Elements
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className="status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="languages">
        {languageElements}
      </section>
      <section className="guess-word">
        {letterElements}
      </section>
      <section className="keyboard">
        {keyboard}
      </section>
      <button className="new-game">New Game</button>
    </main>
  )
}