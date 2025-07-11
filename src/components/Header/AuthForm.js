import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

const initialValues = {
    phone: '',
    password: '',
};

// validate надо переделать!!! добавить проверку на сервере
const validate = (values) => {
    const errors = {};
    if (values.phone === '') {
        errors.phone = "Введите номер телефона";
    }
    if (values.password === '') {
        errors.password = "Введите пароль";
    } else if (values.password.length < 4) {
        errors.password = "Пароль должен быть не менее 4 символов";
    }
    return errors;
};

const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }, 400);
};

const AuthForm = ({ onSubmit }) => (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
            <Form>
                <div>
                    <TextField
                        type="text"
                        label="Номер телефона в формате +7-9**-***-**-** (где * любая цифра от 0 до 9)"
                        variant="standard"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        sx={{ width:'100%', '& label.Mui-focused': {color: '#9eb017'}, '&.Mui-focused fieldset': {borderColor: '#9eb017'} }}
                    />
                    <ErrorMessage name="phone" component="div" style={{ color: 'red' }} />
                </div>
                <div>
                    <TextField
                        type="password"
                        label="Пароль (не менее 4-х знаков)"
                        variant="standard"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        sx={{ width:'100%', marginTop:'10px', '& label.Mui-focused': {color: '#9eb017'}, '&.Mui-focused fieldset': {borderColor: '#9eb017'} }}
                    />
                    <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                </div>
                <Button type="submit" disabled={isSubmitting} sx={{marginTop:'10px', color: '#9eb017'}}>
                    >>> Войти
                </Button>
            </Form>
        )}
    </Formik>
);

export default AuthForm;