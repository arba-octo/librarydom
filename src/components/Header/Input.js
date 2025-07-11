
function InputFormik(props) {
    return (
        <input
            type={props.type}
            name={props.name}
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
        />
    )
}
export default InputFormik;