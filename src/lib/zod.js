import {z} from 'zod';

export const bookZodSchema = z.object({
    title: z.string().min(1, "Поле \"Название\" обязательно для заполнения"),
    author: z.string().nullable(),
    seriesId: z.number().nullable(),
    typeId: z.number().nullable(),
    pages: z.number().min(1, "Поле \"Количество страниц\" обязательно для заполнения"),
    age: z.array(z.number().int()).length(2, "Поле \"Возраст\" должен определяться двумя числами (от и до)"),
    faceImg: z.string().url("Некорректная или отсутствующая ссылка на изображение обложки"),
    tocImg: z.array(z.union([z.string().url("Некорректная или отсутствующая ссылка на изображение оглавления книги"), z.literal("")])),
    exampleImg: z.string().min(1, "Отсутствует ссылка на изображение разворота книги").url("Некорректная ссылка на изображение разворота книги"),
    statusFree: z.boolean(),
    occupiedTo: z.boolean(),
    ownerId: z.number(),
    userId: z.number().nullable(),
    firstSelfReading: z.boolean(),
    checked: z.boolean()
})