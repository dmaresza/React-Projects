import { useState } from 'react'
import Guess from "./Guess"

export default function App() {

  const [currentWord, setCurrentWord] = useState("react")
  const [currentGuess, setCurrentGuess] = useState([])
  const [prevGuesses, setPrevGuesses] = useState([])
  const [guessCount, setGuessCount] = useState(0)

  const alphabet = "qwertyuiopasdfghjklzxcvbnm"

  const guessElements =
    <>
      <Guess {...(guessCount === 0 ? { currentGuess } : {})} guessCount={guessCount} id={0} prevGuesses={prevGuesses} />
      <Guess {...(guessCount === 1 ? { currentGuess } : {})} guessCount={guessCount} id={1} prevGuesses={prevGuesses} />
      <Guess {...(guessCount === 2 ? { currentGuess } : {})} guessCount={guessCount} id={2} prevGuesses={prevGuesses} />
      <Guess {...(guessCount === 3 ? { currentGuess } : {})} guessCount={guessCount} id={3} prevGuesses={prevGuesses} />
      <Guess {...(guessCount === 4 ? { currentGuess } : {})} guessCount={guessCount} id={4} prevGuesses={prevGuesses} />
      <Guess {...(guessCount === 5 ? { currentGuess } : {})} guessCount={guessCount} id={5} prevGuesses={prevGuesses} />
    </>


  const keyboardElements = alphabet.split("").map(letter =>
    <button key={letter} onClick={() => guessLetter(letter)}>{letter.toUpperCase()}</button>
  )

  function guessLetter(letter) {
    if (currentGuess.length < 5) {
      setCurrentGuess(prevGuess => [...prevGuess, letter])
    }
  }

  function submit() {
    if (currentGuess.length === 5) {
      setGuessCount(prevCount => prevCount + 1)
      setPrevGuesses(guesses => [...guesses, currentGuess])
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

  return (
    <main>
      <h1>Wordle</h1>
      <section className="guesses">
        {guessElements}
      </section>
      <section className="keyboard">
        {keyboardElements}
        <button onClick={() => submit()}>↵</button>
        <button onClick={() => backspace()}>⌫</button>
      </section>
    </main>
  )
}
