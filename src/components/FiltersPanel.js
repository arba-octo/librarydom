import Filter from "@/components/Filter";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAge,
    selectAgeToFilter,
    selectTitle,
    selectAuthor,
    removeFilterAction,
    selectActiveFilters, selectSeriesId,
} from "@/features/search/search-slice";
import {AGE_TO_FILTER, AGE, TITLE, SERIESID, AUTHOR} from "@/data/constants";
import {selectBooks} from "@/features/books-slice";
import {selectAllSeries} from "@/features/series-slice";

function FiltersPanel() {
    const dispatch = useDispatch();
    const activeFilters = useSelector(selectActiveFilters);
    const age = useSelector(selectAge);
    const ageToFilter = useSelector(selectAgeToFilter);
    const title = useSelector(selectTitle);
    const seriesId = useSelector(selectSeriesId);
    const seriesAll = useSelector(selectAllSeries);
    const author = useSelector(selectAuthor);
    const books = useSelector(selectBooks);
    const filters = {
        // Фильтр-слайдер для Side-Bar Search
        ageFilter: {
            id: AGE,
            name: "Возраст",
            value: age,
            type: "input-slider"
        },
        // Фильтр-слайдер для FilterPanel
        ageFilterToPanel: {
            id: AGE_TO_FILTER,
            name: "Возраст",
            value: ageToFilter,
            type: "slider"
        },
        titleFilter: {
            id: TITLE,
            name: "Название",
            value: title,
            type: "input-text"
        },
        seriesFilter: {
            id: SERIESID,
            name: "Серия",
            value: seriesAll.find(item => item.id === seriesId)?.name ?? null,
            type: "input-select"
        },
        authorFilter: {
            id: AUTHOR,
            name: "Автор",
            value: author,
            type: "input-text"
        },
    };

    return (
        <div className="filters-panel">
            {activeFilters.map((filterItem) => {
                let currentFilter = null;
                if (filterItem.id === AGE_TO_FILTER) {currentFilter = filters.ageFilterToPanel}
                if (filterItem.id === TITLE) {currentFilter = filters.titleFilter}
                if (filterItem.id === SERIESID) {currentFilter = filters.seriesFilter}
                if (filterItem.id === AUTHOR) {currentFilter = filters.authorFilter}

                if (currentFilter.type === "slider") {
                    return (
                    <Filter
                        key={currentFilter.id}
                        id={currentFilter.id}
                        filterName={currentFilter.name}
                        filterValue={filterItem.value}
                        onClick={ () => dispatch(removeFilterAction({currentFilter, books})) }
                        filterType={currentFilter.type}
                    />
                )}
                if (currentFilter.id === SERIESID) {
                    return (
                        <Filter
                            key={currentFilter.id}
                            id={currentFilter.id}
                            filterName={currentFilter.name}
                            filterValue={currentFilter.value}
                            onClick={ () => dispatch(removeFilterAction({currentFilter, books})) }
                            filterType={currentFilter.type}
                        />
                    )
                }
                return (
                    <Filter
                        key={currentFilter.id}
                        id={currentFilter.id}
                        filterName={currentFilter.name}
                        filterValue={currentFilter.value}
                        onClick={ () => dispatch(removeFilterAction({currentFilter, books})) }
                        filterType={currentFilter.type}
                    />
                )
            })}
        </div>
    )
}
export default FiltersPanel;