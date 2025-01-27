export default function Die(props) {
    return (
        <button
            // key={props.key}
            onClick={props.hold}
            className={props.isHeld ? "clicked" : "unclicked"}
        >{props.value}</button>
    )
}