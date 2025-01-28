import Die from "./Die.jsx"
import { useState, useEffect, useRef } from "react"
import { useWindowSize } from "react-use"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  // Constants
  const [dice, setDice] = useState(() => generateAllNewDice())
  const [numRolls, setNumRolls] = useState(0)
  const [bestScore, setBestScore] = useState(Infinity)
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)
  const diceComponents = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      disabled={gameWon}
      hold={() => hold(die.id)}
    />))
  const buttonRef = useRef(null)
  const { width, height } = useWindowSize()

  if (gameWon && numRolls < bestScore) {
    setBestScore(numRolls)
  }

  // Effects
  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  // Functions
  function generateAllNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6))
    }
    return newDice.map(die => ({ id: nanoid(), value: die, isHeld: false }))
  }

  function rollDice() {
    setNumRolls(prevRolls => prevRolls + 1)
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

  function newGame() {
    setNumRolls(0)
    setDice(generateAllNewDice())
  }

  // JSX elements
  return (
    <main>
      {gameWon && <Confetti width={width} height={height} />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceComponents}
      </div>
      <button
        ref={buttonRef}
        onClick={gameWon ? newGame : rollDice}
        className="roll-button"
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
      {gameWon &&
        <p>You won in {numRolls} rolls!<br /><br /> <b>Best Score: {bestScore}</b></p>
      }
    </main>
  )
}