export default function Die(props) {
    return (
        <button
            onClick={props.hold}
            className={props.isHeld ? "clicked" : "unclicked"}
            disabled={props.disabled}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
    )
}