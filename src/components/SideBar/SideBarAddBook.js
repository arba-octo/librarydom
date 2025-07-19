import { Formik } from 'formik';
import {nanoid} from 'nanoid';
import {useDispatch} from "react-redux";
import {styles} from "@/data/mui-styles";
import {Slider, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, ButtonGroup, Button, InputLabel, Select, MenuItem} from "@mui/material";
import {addBook} from "@/features/books-slice";
import SideBarInput from "@/components/SideBar/SideBarInput";

const marks = [
    {
        value: 6,
        label: '6 лет'
    },
    {
        value: 12,
        label: '12 лет'
    }
];

function SideBarAddBook({seriesFromBD}) {
    const dispatch = useDispatch();
    const handleAddBook = () => {
        // Валидация формы
        fetch('http://localhost:4000/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(data => dispatch(addBook(data)))
    }

    return (
        <Formik
            initialValues={{
                "id": nanoid(),
                "title": "",
                "author": "",
                "seriesId": null,
                "pages": null,
                "age": [0, 18],
                "faceImg": [],
                "tocImg": [],
                "exampleImg": [],
                "statusFree": true,
                "occupiedTo": null,
                "owner": "",
                "user": null,
                "firstSelfReading": false,
                "comments": [],
                "checked": false
            }}
            validate={values => {
                const errors = {};
                if (values.author) {
                    if (values.author.length < 3) {
                        errors.author = 'Минимальная длина 3 сивола.';
                    }
                }
                if (values.title) {
                    errors.title = 'Обязательное для заполнения поле.'
                } else if (values.title.length > 1) {
                    errors.title = 'Минимальная длина 3 символа'
                }
                if (values.pages) {
                    errors.pages = 'Обязательное для заполнения поле.'
                } else if (!(1 <= +values.pages <= 3000)) {

                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => (
                <form
                    action="mailto:nevarus@yandex.ru">

                    <div className="side-bar__slider">
                        <Typography id="age" gutterBottom>
                            Возраст читателя
                        </Typography>
                        <Slider
                            name="age"
                            aria-labelledby="add-book__age"
                            getAriaLabel={() => 'Возраст читателя'}
                            value={values.age}
                            onChange={handleChange}
                            step={1}
                            min={0}
                            max={18}
                            sx={{color: styles.color.green}}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                    </div>

                    <div>
                        <TextField
                            id="add-book__author"
                            name="author"
                            variant="standard"
                            label="Автор"
                            sx={{
                                fontFamily: styles.font.fontFamily,
                                placeholder: styles.font.fontFamily,
                                fontSize: styles.font.fontSize.small,
                                width: '100%',
                                '& label.Mui-focused': {color: '#9eb017'},
                                '&.Mui-focused fieldset': {borderColor: '#9eb017'}
                            }}
                            value={values.author}
                            minLength="2"
                            maxLength="30"
                            onChange={handleChange}
                        />
                        {errors.author && (<div className="input-error">{errors.author}</div>)}
                    </div>

                    <TextField
                        id="add-book__title"
                        name="title"
                        variant="standard"
                        label="Название*"
                        //className="input-error"
                        sx={{ fontFamily: styles.font.fontFamily, width: '100%', '& label.Mui-focused': {color: '#9eb017'}, '&.Mui-focused fieldset': {borderColor: '#9eb017'} }}
                        value={values.title}
                        minLength="2"
                        maxLength="30"
                        onChange={handleChange}
                    />
                    {errors.title && (<div className="input-error">{errors.title}</div>)}

                    <FormControl variant="standard" sx={{mt: 1, width: '100%'}}>
                        <InputLabel id="demo-simple-select-standard-label">Серия книг</InputLabel>
                        <Select
                            id="demo-simple-select-standard"
                            name="seriesId"
                            labelId="demo-simple-select-standard-label"
                            value={values.seriesId ?? ''}
                            onChange={handleChange}
                            label="Series"
                            variant="standard"
                            sx={{ '& label.Mui-focused': {color: '#9eb017'}, '&.Mui-focused fieldset': {borderColor: '#9eb017'} }}
                        >
                            {seriesFromBD.map((item) => {
                                if (!item.shortName) {
                                    return <MenuItem value={item.shortName}>{item.name}</MenuItem>
                                }
                                return <MenuItem value={item.name}>{item.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <TextField
                        id="add-book__pages"
                        name="pages"
                        variant="standard"
                        label="Количество страниц*"
                        sx={{ fontFamily: styles.font.fontFamily, width: '100%', '& label.Mui-focused': {color: '#9eb017'}, '&.Mui-focused fieldset': {borderColor: '#9eb017'} }}
                        value={values.pages}
                        minLength="1"
                        maxLength="4"
                        className="input-error"
                        onChange={handleChange}
                    />
                    <SideBarInput
                        id="add-book__face-img"
                        name="faceImg"
                        type="file"
                        accept="image/*"
                        classNameInput="side-bar__input_add-book side-bar__input-loading"
                        htmlFor="add-book__face-img"
                        label="Фото обложки*:"
                    />

                    <SideBarInput
                        id="add-book__toc-img"
                        name="tocImg"
                        type="file"
                        accept="image/*"
                        classNameInput="side-bar__input_add-book side-bar__input-loading"
                        htmlFor="add-book__toc-img"
                        label="Фото оглавления:"
                        multiple="miltiple"
                    />

                    <SideBarInput
                        id="add-book__examp-img"
                        name="exampImg"
                        type="file"
                        accept="image/*"
                        classNameInput="side-bar__input_add-book side-bar__input-loading"
                        htmlFor="add-book__examp-img"
                        label="Фото типового разворота*:"
                    />

                    <FormControl name="firstSelfReading">
                        <FormLabel
                            id="demo-radio-buttons-group-label"
                            sx={{mt: '10px', fontSize: styles.font.fontSize.medium}}
                        >Подходит для первого самостоятельного чтения?
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={values.firstSelfReading}
                            name="radio-buttons-group"
                            sx={{display: "flex", flexDirection: "row", mt: '-10px'}}
                        >
                            <FormControlLabel value={false} control={<Radio/>} label="Нет"/>
                            <FormControlLabel value={true} control={<Radio/>} label="Да"/>
                        </RadioGroup>
                    </FormControl>

                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button
                            sx={{width: '50%', bgcolor: styles.color.green}}
                            type='submit'
                            onClick={handleAddBook}
                        >
                            Добавить
                        </Button>
                        <Button
                            sx={{width: '50%', bgcolor: styles.color.greyDark}}
                            type='reset'
                            onClick={console.log}
                        >
                            Очистить
                        </Button>
                    </ButtonGroup>
                </form>
            )}
        </Formik>
    )
}

export default SideBarAddBook;