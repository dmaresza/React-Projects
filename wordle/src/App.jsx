import { useState } from 'react'

export default function App() {

  const [currentWord, setCurrentWord] = useState("react")

  const alphabet = "qwertyuiopasdfghjklzxcvbnm"

  const guessList = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]]
  console.log(guessList)

  const letterElements = guessList.map(guess => <div>{guess.map(letter =>
    <span>{letter}</span>)}</div>)

  const keyboardElements = alphabet.split("").map(letter =>
    <button key={letter}>{letter.toUpperCase()}</button>
  )

  return (
    <main>
      <h1>Wordle</h1>
      <section className="guesses">
        {letterElements}
      </section>
      <section className="keyboard">
        {keyboardElements}
      </section>
    </main>
  )
}
