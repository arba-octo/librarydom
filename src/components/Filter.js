import styles from "@/components/Favourite.module.css";

function Filter(props) {
    return (
        <div
            className={`clear ${styles["filter-panel__filter"]}`}
            id={props.id}
            onClick={props.onClick}
        >
            {props.filterName}:
            &ensp;
            {props.filterType === "slider" && (
                <span>{props.filterValue[0]} - {props.filterValue[1]}</span>
            )}
            {props.filterType === "input-text" && (
                <span>{props.filterValue}</span>
            )}
            {props.filterType === "input-select" && (
                <span>{props.filterValue}</span>
            )}
        </div>
    )
}
export default Filter;