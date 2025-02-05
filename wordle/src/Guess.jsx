export default function Guess(props) {
    if (props.currentGuess) {
        return (
            <div>
                <span>{props.currentGuess[0]}</span>
                <span>{props.currentGuess[1]}</span>
                <span>{props.currentGuess[2]}</span>
                <span>{props.currentGuess[3]}</span>
                <span>{props.currentGuess[4]}</span>
            </div>
        )
    }
    else if (props.prevGuesses.length > props.id) {
        return (
            <div>
                <span>{props.prevGuesses[props.id][0]}</span>
                <span>{props.prevGuesses[props.id][1]}</span>
                <span>{props.prevGuesses[props.id][2]}</span>
                <span>{props.prevGuesses[props.id][3]}</span>
                <span>{props.prevGuesses[props.id][4]}</span>
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