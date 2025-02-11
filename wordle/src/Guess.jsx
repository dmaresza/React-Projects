export default function Guess(props) {
    if (props.guessCount === props.id) {
        const displaySpans = [...props.currentGuess]
        while (displaySpans.length < 5) {
            displaySpans.push("")
        }
        return (
            <div>{displaySpans.map((letter, index) => <span key={index}>{letter.toUpperCase()}</span>)}</div>
        )
    }
    else if (props.prevGuesses.length > props.id) {
        const wordMap = new Map()
        props.currentWord.split("").forEach((letter, index) => wordMap.has(letter) ? wordMap.set(letter, [...wordMap.get(letter), index]) : wordMap.set(letter, [index]))
        const displayWord = props.prevGuesses[props.id]
        const classNames = ["wrong", "wrong", "wrong", "wrong", "wrong"]
        displayWord.forEach((letter, index) => {
            if (wordMap.has(letter) && wordMap.get(letter).includes(index)) {
                classNames[index] = "correct"
                const arrayIndex = wordMap.get(letter).indexOf(index)
                wordMap.get(letter).splice(arrayIndex, 1)
                if (wordMap.get(letter).length === 0) {
                    wordMap.delete(letter)
                }
            }
        })
        displayWord.forEach((letter, index) => {
            if (wordMap.has(letter) && !wordMap.get(letter).includes(index) && classNames[index] != "correct") {
                classNames[index] = "close"
                wordMap.get(letter).splice(0, 1)
                if (wordMap.get(letter).length === 0) {
                    wordMap.delete(letter)
                }
            }
        })
        return (
            <div>
                {displayWord.map((letter, index) => <span key={index} className={classNames[index]}>{letter.toUpperCase()}</span>)}
            </div>
        )
    }
    else {
        return (
            <div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
    }
}