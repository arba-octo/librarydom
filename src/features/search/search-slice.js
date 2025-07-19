import {createSlice} from "@reduxjs/toolkit";
import {AGE_TO_FILTER} from "@/data/constants";

export const initialState = {
    age: [0, 18], // значение в инпуте sidebar "Возраст"
    ageToFilter: [0, 18], // Отделили от age, чтобы в фильтре панели фильтров изменения отображались только после отпускания мыши со слайдера
    title: '', // значение в инпуте sidebar "Название"
    author: '', // значение в инпуте sidebar "Автор"
    seriesId: '', // значение в инпуте sidebar "Серия"
    activeFilters: [], // массив объектов (фильтров), в payload передается id, value и массивом книг books
    filteredBooks: [], // массив отображаемых с учетом активных фильтров книг
    search: '', // строка поиска в Header
};

const toDisplayBooks = (activeFilters, books) => {
    return books.filter((bookItem) => {
        return !activeFilters.some((filterItem) => {
            if (filterItem.id === "ageToFilter") {
                return !(bookItem.age[0] <= filterItem.value[1] && bookItem.age[1] >= filterItem.value[0]);
            }
            if (filterItem.id === "seriesId") {
                return !(bookItem.seriesId === filterItem.value);
            }
            if (filterItem.value !== '') {
                // так как в некоторых книгах не указан автор (значение null в БД) - надо проверить есть ли у книги автор
                if (bookItem[filterItem.id] !== null) {
                    return !bookItem[filterItem.id].toLowerCase().includes(filterItem.value.toLowerCase())
                } else {return false} // если автора нет, то данная книга не отображается при заполненном инпуте Автор
            }
            return true;
        });
    })
};
const toDisplayBooksBySearch = (value, books) => {
    return books.filter((bookItem) => {
      if (bookItem.author !== null && bookItem.title !== '') {
          return bookItem.title.toLowerCase().includes(value.toLowerCase()) || bookItem.author.toLowerCase().includes(value.toLowerCase());
      }
      if (bookItem.author !== null && bookItem.title === '') {
          return bookItem.author.toLowerCase().includes(value.toLowerCase())
      }
      if (bookItem.author === null && bookItem.title !== '') {
          return bookItem.title.toLowerCase().includes(value.toLowerCase())
      }
  })
};

const searchSlice = createSlice({
    name: "@@search",
    initialState,
    reducers: {

        // При загрузке страницы выгружает книги, используется в BooksCatalogPreview
        setFilteredBooks: (state, action) => {
            state.filteredBooks = action.payload;
            state.filteredBooks = state.filteredBooks.filter(itemBook => itemBook.checked)
        },

        // Обрабатывает добавление и изменение значений активных фильтров на FilterPanel, используется в SideBarSearch
        // в payload приходит id, value (из инпута), books
        setFilter(state, { payload }) {
            // Если среди активных фильтров нового фильтра нет и новый фильтрне пустая строка
            if (( !state.activeFilters.some(filterItem => filterItem.id === payload.id ) && payload.value !== "")) {
                state.activeFilters = state.activeFilters.concat({id: payload.id, value : payload.value});
            }
            // Если фильтр уже активен и новое значение фильтра не является пустой строкой
            else if (payload.value !== "") {
                state.activeFilters = state.activeFilters.map(item => {
                    if (item.id === payload.id) {
                        return { ...item, value: payload.value };
                    }
                    return item;
                })
            } else {
                return
            }
            state.filteredBooks = toDisplayBooks(state.activeFilters, payload.books);
        },

        // Обрабатывает отображение книг в соответствии с заданным value поиска. Используется в Header (поиск)
        setSearch(state, { payload }) {
            state.filteredBooks = toDisplayBooksBySearch(payload.search, payload.books);
        },

        // Обрабатывает отображение value в поляз SideBarSearch
        changeValueAction: (state, { payload }) => {
            state[payload.id] = payload.value;
        },
        removeFilterAction: (state, { payload }) => {
            state[payload.currentFilter.id] = initialState[payload.currentFilter.id];
            if (payload.currentFilter.id === "ageToFilter") {state.age = initialState.age; state.ageToFilter = initialState.ageToFilter};
            state.activeFilters = state.activeFilters.filter((item) => item.id !== payload.currentFilter.id);
            state.filteredBooks = toDisplayBooks(state.activeFilters, payload.books);
        },
        // стоит на кнопке очистки всех фильтров в SideBarSearch, в payload заходит books (все книги из БД)
        clearAllFiltersAction: (state, action) => {
            state.activeFilters.map((item) => {
                if (item.id === AGE_TO_FILTER) {state.age = initialState.age}
                state[item.id] = initialState[item.id]
            })
            state.activeFilters = initialState.activeFilters;
            state.filteredBooks = action.payload;
        }
    },
});

export const {
    setFilteredBooks,
    setFilter,
    setSearch,
    changeValueAction,
    removeFilterAction,
    clearAllFiltersAction,
} = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

export const selectAge = (state) => state.search.age;
export const selectAgeToFilter = (state) => state.search.ageToFilter;
export const selectTitle = (state) => state.search.title;
export const selectSeriesId = (state) => state.search.seriesId;
export const selectAuthor = (state) => state.search.author;
export const selectActiveFilters = (state) => state.search.activeFilters;
export const selectFilteredBooks = (state) => state.search.filteredBooks;
export const selectSearch = (state) => state.search.search;