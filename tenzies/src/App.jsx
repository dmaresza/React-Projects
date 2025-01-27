import Die from "./Die.jsx"
import { useState } from "react"
import { nanoid } from "nanoid"

export default function App() {

  const [dice, setDice] = useState(generateAllNewDice())
  const diceComponents = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
    />))

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

  return (
    <main>
      <div className="dice-container">
        {diceComponents}
      </div>
      <button onClick={rollDice} className="roll-button">Roll</button>
    </main>
  )
}