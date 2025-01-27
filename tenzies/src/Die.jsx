export default function Die(props) {
    return (
        <button key={props.index}>{props.value}</button>
    )
}