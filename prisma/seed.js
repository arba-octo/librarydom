const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

    // Создаём пользователей ----------------------------------------------------------------------------------
    const userDanaArb = await prisma.users.create({
        data: {
            name: "DanaArb",
            phone: "+79817940081",
            password: "Dana060718",
            whatsup: true,
            telegramm: true,
            email: "nevarus@yandex.ru",
            rating: 10,
        }
    });

    // Создаём серии ------------------------------------------------------------------------------------------
    const seriesZemlFeya = await prisma.series.create({
        data: {
            key: "zeml-feya",
            name: "Земляничная Фея",
        }
    });

    const seriesShyak = await prisma.series.create({
        data: {
            key: "cat-shmyak",
            name: "Котёнок Шмяк",
        }
    });

    const seriesMeyzi = await prisma.series.create({
        data: {
            key: "meyzi-hitchins",
            name: "Мейзи Хитчинс: приключения девочки-детектива",
        }
    });

    // Создаем типы книг ---------------------------------------------------------------------------------------
    const typeEncic = await prisma.types.create({
        data: {
            name: "Энциклопедия"
        }
    });
    const typeChildDetect = await prisma.types.create({
        data: {
            name: "Детский детектив"
        }
    });
    const typeComix = await prisma.types.create({
        data: {
            name: "Комиксы"
        }
    });
    const typeLearn = await prisma.types.create({
        data: {
            name: "Обучение"
        }
    });

    // Создаём книги — обязательно указываем ownerId, seriesId и (опционально) userId ---------------------------
    const book1 = await prisma.books.create({
        data: {
            title: "Роболты. Улётная история!!!",
            author: "Матюшкина Катя, Сильвер Саша",
            seriesId: null,
            typeId: typeChildDetect.id,
            pages: 400,
            age: [4, 10],
            faceImg: "https://librarydom.ru/robolts_face.jpg",
            tocImg: ["https://librarydom.ru/robolts_toc.jpg"],
            exampleImg: "https://librarydom.ru/robolts_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true,
        }
    });
    const book2 = await prisma.books.create({
        data: {
            title: "Драконы. Твоя первая энциклопедия",
            author: null,
            seriesId: null,
            typeId: typeEncic.id,
            pages: 128,
            age: [3, 8],
            faceImg: "https://librarydom/dragons_first-ciclopedia_face.jpg",
            tocImg: [],
            exampleImg: "https://librarydom/dragons_first-ciclopedia_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true,
        }
    });
    const book3 = await prisma.books.create({
        data: {
            title: "Сказки и картинки",
            author: "Сутеев В.",
            seriesId: null,
            typeId: null,
            pages: 124,
            age: [1, 7],
            faceImg: "https://librarydom/tales-and-pictures_suteev_face.jpg",
            tocImg: ["tales-and-pictures_suteev_toc.jpg"],
            exampleImg: "https://librarydom/tales-and-pictures_suteev_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: true,
            checked: true,
        }
    });
    const book4 = await prisma.books.create({
        data: {
            title: "Всё-всё-всё о муми-троллях для малышей",
            author: "Янссон Т.",
            seriesId: null,
            typeId: null,
            pages: 224,
            age: [2, 7],
            faceImg: "https://librarydom/mumy-trolls_face.jpg",
            tocImg: ["https://librarydom/mumy-trolls_toc.jpg"],
            exampleImg: "https://librarydom/mumy-trolls_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: true,
            checked: true,
        }
    });
    const book5 = await prisma.books.create({
        data: {
            title: "400 самых дюбимых вредных советов",
            author: "Остер Г.",
            seriesId: null,
            typeId: null,
            pages: 414,
            age: [7, 13],
            faceImg: "https://librarydom/400-harm-advice_oster_face.jpg",
            tocImg: [],
            exampleImg: "https://librarydom/400-harm-advice_oster_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true,
        }
    });
    const book6 = await prisma.books.create({
        data: {
            title: "Повесть Маугли и сказки",
            author: "Киплинг Р.",
            seriesId: null,
            typeId: null,
            pages: 384,
            age: [6, 13],
            faceImg: "https://librarydom/kipling_face.jpg",
            tocImg: ["https://librarydom/kipling_toc.jpg"],
            exampleImg: "https://librarydom/kipling_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true,
        }
    });
    const book7 = await prisma.books.create({
        data: {
            title: "Земляничная Фея. Удивительное заклинание",
            author: "Дале Ш.",
            seriesId: seriesZemlFeya.id,
            typeId: null,
            pages: 48,
            age: [3, 7],
            faceImg: "https://librarydom/zeml-feya-amazing-spells_fase.jpg",
            tocImg: ["https://librarydom/zeml-feya-amazing-spells_toc.jpg"],
            exampleImg: "https://librarydom/zeml-feya-amazing-spells_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true,
        }
    });
    const book8 = await prisma.books.create({
        data: {
            title: "Земляничная Фея. Три волшебные ягодки",
            author: "Дале Ш.",
            seriesId: seriesZemlFeya.id,
            typeId: null,
            pages: 48,
            age: [3, 7],
            faceImg: "https://librarydom/zeml-feya-3wildb_face.jpg",
            tocImg: ["https://librarydom/zeml-feya-3wildb_toc.jpg"],
            exampleImg: "https://librarydom/zeml-feya-3wildb_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true,
        }
    });
    const book9 = await prisma.books.create({
        data: {
            title: "Котенок Шмяк идёт к доктору",
            author: "Скоттон Р.",
            seriesId: seriesShyak.id,
            typeId: null,
            pages: 32,
            age: [1, 7],
            faceImg: "https://librarydom/shmyak-to-doctor_face.jpg",
            tocImg: [],
            exampleImg: "https://librarydom/shmyak-to-doctor_face.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: true,
            checked: true,
        }
    });
    const book10 = await prisma.books.create({
        data: {
            title: "Спокойной ночи, Шмяк!",
            author: "Скоттон Р.",
            seriesId: seriesShyak.id,
            typeId: null,
            pages: 31,
            age: [1, 7],
            faceImg: "https://librarydom/shmyak-good-night_face.jpg",
            tocImg: [],
            exampleImg: "https://librarydom/shmyak-good-night_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: true,
            checked: true,
        }
    });
    const book11 = await prisma.books.create({
        data: {
            title: "Котенок Шмяк и морские истории",
            author: "Скоттон Р.",
            seriesId: seriesShyak.id,
            typeId: null,
            pages: 31,
            age: [1, 7],
            faceImg: "https://librarydom/shmyak-sea-histories_face.jpg",
            tocImg: [],
            exampleImg: "https://librarydom/shmyak-sea-histories_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: true,
            checked: true,
        }
    });
    const book12 = await prisma.books.create({
        data: {
            title: "Новая детская энциклопедия",
            author: null,
            seriesId: null,
            typeId: typeEncic,
            pages: 320,
            age: [6, 10],
            faceImg: "https://librarydom/new-child-encic_face.jpg",
            tocImg: ["https://librarydom/new-child-encic_toc1.jpg", "https://librarydom/new-child-encic_toc2.jpg", "https://librarydom/new-child-encic_toc3.jpg", "https://librarydom/new-child-encic_toc4.jpg"],
            exampleImg: "https://librarydom/new-child-encic_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: false,
        }
    });
    const book13 = await prisma.books.create({
        data: {
            title: "Мои эмоции. 20 терапевтических сказок",
            author: "Хонина И., Смирнова Е.",
            seriesId: null,
            typeId: typeLearn,
            pages: 63,
            age: [2, 7],
            faceImg: "https://librarydom/my-emotions-20-tales_face.jpg",
            tocImg: ["https://librarydom/my-emotions-20-tales_toc.jpg"],
            exampleImg: "https://librarydom/my-emotions-20-tales_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: true,
            checked: true,
        }
    });
    const book14 = await prisma.books.create({
        data: {
            title: "Детская энциклопедия динозавров",
            author: null,
            seriesId: null,
            typeId: typeEncic,
            pages: 100,
            age: [4, 10],
            faceImg: "https://librarydom/child-encic-dinosaurs_face.jpg",
            tocImg: ["https://librarydom/child-encic-dinosaurs_toc.jpg"],
            exampleImg: "https://librarydom/child-encic-dinosaurs_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true,
        }
    });
    const book15 = await prisma.books.create({
        data: {
            title: "Вредные советы",
            author: "Остер Г.",
            seriesId: null,
            typeId: null,
            pages: 160,
            age: [4, 10],
            faceImg: "https://librarydom/harm-advices-oster_face.jpg",
            tocImg: [],
            exampleImg: "https://librarydom/harm-advices-oster_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true,
        }
    });
    const book16 = await prisma.books.create({
        data: {
            title: "Мейзи Хитчинс. Тайна мальчика из джунглей",
            author: "Вебб Х.",
            seriesId: seriesMeyzi.id,
            pages: 124,
            age: [7, 12],
            faceImg: "https://librarydom/meizi-secret-boy-from-jungles_face.jpg",
            tocImg: [],
            exampleImg: "https://librarydom/meizi-secret-boy-from-jungles_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true,
        }
    });
    const book17 = await prisma.books.create({
        data: {
            title: "Зоки и Бада",
            author: "Тюхтяевы И. и Л.",
            seriesId: null,
            typeId: null,
            pages: 144,
            age: [4, 7],
            faceImg: "https://librarydom/zokies-and-bada_face.jpg",
            tocImg: [],
            exampleImg: "https://librarydom/zokies-and-bada_toc.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true,
        }
    });
    const book18 = await prisma.books.create({
        data: {
            title: "Путешествие в королевство эльфов",
            author: "Савченко Е.",
            seriesId: null,
            typeId: null,
            pages: 143,
            age: [4, 10],
            faceImg: "https://librarydom/trip-to-elfs-kingdom_face.jpg",
            tocImg: [],
            exampleImg: "https://librarydom/trip-to-elfs-kingdom_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true,
        }
    });
    const book19 = await prisma.books.create({
        data: {
            title: "Спящая красавица и другие сказки Шарля Перро",
            author: "Перро Ш.",
            seriesId: null,
            typeId: null,
            pages: 47,
            age: [3, 8],
            faceImg: "https://librarydom/pero-sleep-beauty-cat-in-boots_face.jpg",
            tocImg: ["https://librarydom/pero-sleep-beauty-cat-in-boots_toc.jpg"],
            exampleImg: "https://librarydom/pero-sleep-beauty-cat-in-boots_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true,
        }
    });

    // Создаем комментарии
    const comments1 = await prisma.comments.create({
        data: {
            book:   book1.id,
            userId: userDanaArb.id,
            text: "Детективная история-приключение в железном придуманном мире роболтов. Очень захватывает детей и читается на одном дыхании. Много ярких картинок. Первая книга из серии.",
        }
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });