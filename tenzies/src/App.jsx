import Die from "./Die.jsx"
import { useState } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  // Constants
  const [dice, setDice] = useState(() => generateAllNewDice())
  const diceComponents = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
    />))
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  // Functions
  function generateAllNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6))
    }
    return newDice.map(die => ({ id: nanoid(), value: die, isHeld: false }))
  }

  function rollDice() {
    setDice(prevDice => (
      prevDice.map(die => (
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      ))
    ))
  }

  function hold(id) {
    setDice(prevDice => (
      prevDice.map(die => (
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )))
    )
  }

  // JSX elements
  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceComponents}
      </div>
      <button
        onClick={gameWon ? () => setDice(generateAllNewDice()) : rollDice}
        className="roll-button"
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}