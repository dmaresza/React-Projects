import Die from "./Die.jsx"
import { useState } from "react"

export default function App() {

  const [dice, setDice] = useState(generateAllNewDice())
  const diceComponents = dice.map((die, index) => <Die key={index} value={die} />)

  function generateAllNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6))
    }
    return newDice
  }

  function rollDice() {
    setDice(generateAllNewDice())
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