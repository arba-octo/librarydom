import {useSelector, useDispatch} from 'react-redux';
import {styles} from "../../../../dev/library/library-dom/src/data/mui-styles";
import {Slider, TextField, Typography, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {
    setFilter,
    selectAge,
    selectTitle,
    selectAuthor,
    changeValueAction,
    clearAllFiltersAction, selectSeriesId,
} from '../../../../dev/library/library-dom/src/features/search/search-slice';
import {selectBooks} from "../../../../dev/library/library-dom/src/features/books-slice";
import {useValue} from "../../../../dev/library/library-dom/src/features/search/use-value";

function SideBarSearch(props) {
    const dispatch = useDispatch();
    const marks = [
        {
            value: 6,
            label: '6 лет'
        },
        {
            value: 12,
            label: '12 лет'
        }
    ]
    const [age, handleChangeAge] = useValue(selectAge, changeValueAction); // состояние поля 'Возраст'
    const [title, handleChangeTitle] = useValue(selectTitle, changeValueAction); // состояние поля 'Название'
    const [author, handleChangeAuthor] = useValue(selectAuthor, changeValueAction); // состояние поля 'Автор'
    const [seriesId, handleChangeSeriesId] = useValue(selectSeriesId, changeValueAction); // серия книги, выбранная в фильтре
    const books = useSelector(selectBooks); // массив с книгами из БД

    return (
        <div className="side-bar__inputs">
            <Typography id="age" gutterBottom>
                Возраст читателя
            </Typography>
            <Slider
                aria-labelledby="age"
                getAriaLabel={() => 'Возраст читателя'}
                value={age}
                step={1}
                min={0}
                max={18}
                valueLabelDisplay="auto"
                marks={marks}
                sx={{color: styles.color.green}}
                onChange={(evt) => dispatch(changeValueAction({id: "age", value: evt.target.value}))}
                onClick={(evt) => dispatch(setFilter({id: "ageToFilter", value: age, books}))}
            />
            <TextField
                id="title"
                className="input-error"
                variant="standard"
                label="Название / ключевое слово"
                value={title}
                onChange={handleChangeTitle}
                onBlur={(evt) => dispatch(setFilter({id: "title", value: title, books}))}
                sx={{ mt: 1, minWidth: 120, '& label.Mui-focused': {color: '#9eb017'}, '&.Mui-focused fieldset': {borderColor: '#9eb017'} }}
            />

            <FormControl id="series" variant="standard" sx={{ mt: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Серия книг</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={seriesId}
                    onChange={ (evt) => {
                        dispatch(changeValueAction({id: "seriesId", value: evt.target.value}))
                        dispatch(setFilter({id: "seriesId", value: evt.target.value, books}))
                    } }
                    label="Series"
                >
                    <MenuItem value="">
                        <em>Без серии</em>
                    </MenuItem>
                    {props.seriesFromBD.map((item) => {
                        if (!item.shortName) {
                            return <MenuItem value={item.id} key={item.key}>{item.name}</MenuItem>
                        }
                        return <MenuItem value={item.id} key={item.key}>{item.shortName}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <TextField
                id="author"
                variant="standard"
                label="Автор"
                value={author}
                onChange={handleChangeAuthor}
                onBlur={(evt) => dispatch(setFilter({id: "author", value: author, books}))}
                sx={{ mt: 1, minWidth: 120, '& label.Mui-focused': {color: '#9eb017'}, '&.Mui-focused fieldset': {borderColor: '#9eb017'} }}
            />
            <button
                className="clear side-bar__clear-button"
                onClick={(evt) => {
                    dispatch(clearAllFiltersAction(books));
                }}
            >Очистить фильтр</button>
        </div>
    )
}
export default SideBarSearch;