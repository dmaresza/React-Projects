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
        const displayWord = props.prevGuesses[props.id]
        console.log(displayWord)
        const classNames = []
        console.log(props.currentWord)
        console.log(props.currentWord[0])
        displayWord.forEach((letter, index) => props.currentWord[index] === letter ? classNames.push("correct") : !props.currentWord.includes(letter) ? classNames.push("wrong") : classNames.push("close"))
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