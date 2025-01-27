import Die from "./Die.jsx"
import { useState } from "react"

export default function App() {

  const [dice, setDice] = useState([2, 2, 3, 4, 5, 6, 5, 4, 3, 2])
  const diceComponents = dice.map((die, index) => <Die key={index} value={die} />)

  return (
    <main>
      <div className="dice-container">
        {diceComponents}
      </div>
    </main>
  )
}