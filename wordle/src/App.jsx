import { useState } from 'react'
import Guess from "./Guess"
import { getNewWord } from './words'

export default function App() {

  const [currentWord, setCurrentWord] = useState(() => getNewWord())
  const [currentGuess, setCurrentGuess] = useState([])
  const [prevGuesses, setPrevGuesses] = useState([])
  const [guessCount, setGuessCount] = useState(0)
  // const [correctLetters, setCorrectLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])

  const alphabet = "qwertyuiopasdfghjklzxcvbnm"

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
    return < button key={letter} className={className} onClick={() => guessLetter(letter)
    }> {letter.toUpperCase()}</button >
  }
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