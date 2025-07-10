import { Formik } from 'formik';
import InputFormik from "./Input";


function Reg() {
    return (
        <Formik
            initialValues={ {phone: '', password: ''} }
            validate={ (values) => {
                const errors = {};
                if (values.phone) {errors.phone = 'Введите номер телефона, на который зарегистрирован аккаунт'}
                else if (!/\+*[78]?\-?9\d{2}\-?\d{3}\-?\d{2}\-?\d{2}/i.test(values.phone)) {
                    errors.phone = 'Неверный формат или данные: номер телефона должен быть 9**-***-**-** (* = любая цифра от 0 до 9)'
                }
                if (values.password) {errors.phone = 'Введите пароль'}
                else if (values.password.length < 4) {errors.phone = 'Пароль должен содержать не менее 4-х знаков'}
                return errors;
            } }
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
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="phone">Введите номер телефона в формате +7-9**-***-**-** (где * любая цифра от 0 до 9)</label>
                    <InputFormik
                        type="phone"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                    />
                    <label htmlFor="password">Введите пароль (не менее 4-х знаков - цифры, латинский буквы, "-" и
                        "_")</label>
                    <InputFormik
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    <button type="submit" disabled={isSubmitting}>
                        Зарегистрироваться
                    </button>
                </form>
            )
            }
        </Formik>
    )
}

export default Reg;