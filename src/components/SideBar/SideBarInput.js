
function SideBarInput(props) {
    return (
        <div>
            <label htmlFor={props.id} className="side-bar__label">{props.label}</label>
            <input
                name={props.name}
                id={props.id}
                type={props.type}
                accept={props.accept}
                className={props.classNameInput}
                multiple={props.multiple}
            />
        </div>

    )
}
export default SideBarInput;