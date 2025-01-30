import { useState } from 'react'
import { languages } from "./languages"
import { clsx } from "clsx"

export default function App() {

  // State variables
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])

  // Derived variables
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameWon = guessedLetters.filter(letter => currentWord.includes(letter)).length === currentWord.length
  const isGameOver = isGameWon || isGameLost

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

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const keyboard = alphabet.split("").map(letter => {
    const correctGuess = guessedLetters.includes(letter) && currentWord.includes(letter)
    const incorrectGuess = guessedLetters.includes(letter) && !currentWord.includes(letter)
    const className = clsx({ correct: correctGuess }, { incorrect: incorrectGuess })
    return <button
      key={letter}
      onClick={() => guessLetter(letter)}
      className={className}
      disabled={isGameOver}
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
  }

  // DOM Elements
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className={clsx("status", { "won": isGameWon }, { "lost": isGameLost })}>
        {isGameOver &&
          <>
            <h2>{isGameWon ? "You win!" : "Game over!"}</h2>
            <p>{isGameWon ? "Well done! 🎉" : "You lose! Better start learning Assembly 😭"}</p>
          </>
        }
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
      {isGameOver && <button className="new-game" onClick={() => newGame()}>New Game</button>}
    </main>
  )
}