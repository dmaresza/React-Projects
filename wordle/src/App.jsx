import { useState } from 'react'
import Guess from "./Guess"

export default function App() {

  const [currentWord, setCurrentWord] = useState("react")
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

  const guessList = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]]

  const letterElements = guessList.map(guess => <div>{guess.map((letter, index) =>
    <span key={index}>{letter}</span>)}</div>)


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
      setGuessedLetters(prevLetters => [...prevLetters, ...currentGuess.filter(letter => !prevLetters.includes(letter))])
      // setCorrectLetters(prevLetters => [...prevLetters, ...currentGuess.filter(letter => currentWord.includes(letter) && !prevLetters.includes(letter))])
      // setCorrectLetters(prevLetters => [...prevLetters, ...currentWord.split("").filter(letter => currentGuess.includes(letter) && !prevLetters.includes(letter))])
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


/* 
Get 5-letter word to be guessed (WTBG)

Display 6x5 grid (6 guesses, 5 letters each)
Display keyboard

On keyboard letter click: update current guess (of 6 guesses) to display letter (max 5 letters)
On backspace click: remove last-clicked letter (nothing happens if no letters displayed)
On Enter click: check guessed letters against WTBG, display correct/close letters,
move to next guess if guessCount < 6 and correct word not guessed,
win game if correct word guessed, lose game if guessCount limit reached

*/