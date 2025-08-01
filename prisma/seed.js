const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

    // Создаём пользователей ----------------------------------------------------------------------------------
    const userDanaArb = await prisma.users.upsert({
        where: { email: "nevarus@yandex.ru" }, // <-- уникальное поле
        update: {
            name: "DanaArb",
            phone: "+79817940081",
            password: "Dana060718",
            whatsUp: true,
            telegram: true,
            rating: 10
        },
        create: {
            name: "DanaArb",
            phone: "+79817940081",
            password: "Dana060718",
            whatsUp: true,
            telegram: true,
            email: "nevarus@yandex.ru",
            rating: 10
        },
    });

    // Создаём серии ------------------------------------------------------------------------------------------
    const seriesZemlFeya = await prisma.series.upsert({
        where: { key: "zeml-feya" },
        update: {
            name: "Земляничная Фея",
        },
        create: {
            key: "zeml-feya",
            name: "Земляничная Фея"
        }
    });
    const seriesShmyak = await prisma.series.upsert({
        where: { key: "cat-shmyak" },
        update: {
            name: "Котёнок Шмяк",
        },
        create: {
            key: "cat-shmyak",
            name: "Котёнок Шмяк"
        }
    });
    const seriesMeyzi = await prisma.series.upsert({
        where: { key: "meyzi-hitchins" },
        update: {
            name: "Мейзи Хитчинс: приключения девочки-детектива",
        },
        create: {
            key: "meyzi-hitchins",
            name: "Мейзи Хитчинс: приключения девочки-детектива"
        }
    });

    // Создаем типы книг ---------------------------------------------------------------------------------------
    const typeEncic = await prisma.types.upsert({
        where: { key: "encic" },
        update: {
            name: "Энциклопедия"
        },
        create: {
            key: "encic",
            name: "Энциклопедия"
        }
    });
    const typeChildDetect = await prisma.types.upsert({
        where: { key: "childDetect" },
        update: {
            name: "Детский детектив"
        },
        create: {
            key: "childDetect",
            name: "Детский детектив"
        }
    });
    const typeComix = await prisma.types.upsert({
        where: { key: "comix" },
        update: {
            name: "Комиксы"
        },
        create: {
            key: "comix",
            name: "Комиксы"
        }
    });
    const typeLearn = await prisma.types.upsert({
        where: { key: "learn" },
        update: {
            name: "Обучение"
        },
        create: {
            key: "learn",
            name: "Обучение"
        }
    });

    // Создаём книги ---------------------------
    const book1 = await prisma.books.create({
        data: {
            key: "book1",
            title: "Роболты. Улётная история!!!",
            author: "Матюшкина Катя, Сильвер Саша",
            seriesId: null,
            typeId: typeChildDetect.id,
            pages: 400,
            age: [4, 10],
            faceImg: "/images/robolts_face.jpg",
            tocImg: ["/images/robolts_toc.jpg"],
            exampleImg: "/images/robolts_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });
    const book2 = await prisma.books.create({
        data: {
            key: "book2",
            title: "Драконы. Твоя первая энциклопедия",
            author: null,
            seriesId: null,
            typeId: typeEncic.id,
            pages: 128,
            age: [3, 8],
            faceImg: "/images/dragons_first-ciclopedia_face.jpg",
            tocImg: [],
            exampleImg: "/images/dragons_first-ciclopedia_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });
    const book3 = await prisma.books.create({
        data: {
            key: "book3",
            title: "Сказки и картинки",
            author: "Сутеев В.",
            seriesId: null,
            typeId: null,
            pages: 124,
            age: [1, 7],
            faceImg: "/images/tales-and-pictures_suteev_face.jpg",
            tocImg: ["/images/tales-and-pictures_suteev_toc.jpg"],
            exampleImg: "/images/tales-and-pictures_suteev_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: true,
            checked: true
        }
    });
    const book4 = await prisma.books.create({
        data: {
            key: "book4",
            title: "Всё-всё-всё о муми-троллях для малышей",
            author: "Янссон Т.",
            seriesId: null,
            typeId: null,
            pages: 224,
            age: [2, 7],
            faceImg: "/images/mumy-trolls_face.jpg",
            tocImg: ["/images/mumy-trolls_toc.jpg"],
            exampleImg: "/images/mumy-trolls_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: true,
            checked: true
        }
    });
    const book5 = await prisma.books.create({
        data: {
            key: "book5",
            title: "400 самых дюбимых вредных советов",
            author: "Остер Г.",
            seriesId: null,
            typeId: null,
            pages: 414,
            age: [7, 13],
            faceImg: "/images/400-harm-advice_oster_face.jpg",
            tocImg: [],
            exampleImg: "/images/400-harm-advice_oster_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });
    const book6 = await prisma.books.create({
        data: {
            key: "book6",
            title: "Повесть Маугли и сказки",
            author: "Киплинг Р.",
            seriesId: null,
            typeId: null,
            pages: 384,
            age: [6, 13],
            faceImg: "/images/kipling_face.jpg",
            tocImg: ["/images/kipling_toc.jpg"],
            exampleImg: "/images/kipling_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });
    const book7 = await prisma.books.create({
        data: {
            key: "book7",
            title: "Земляничная Фея. Удивительное заклинание",
            author: "Дале Ш.",
            seriesId: seriesZemlFeya.id,
            typeId: null,
            pages: 48,
            age: [3, 7],
            faceImg: "/images/zeml-feya-amazing-spells_fase.jpg",
            tocImg: ["/images/zeml-feya-amazing-spells_toc.jpg"],
            exampleImg: "/images/zeml-feya-amazing-spells_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });
    const book8 = await prisma.books.create({
        data: {
            key: "book8",
            title: "Земляничная Фея. Три волшебные ягодки",
            author: "Дале Ш.",
            seriesId: seriesZemlFeya.id,
            typeId: null,
            pages: 48,
            age: [3, 7],
            faceImg: "/images/zeml-feya-3wildb_face.jpg",
            tocImg: ["/images/zeml-feya-3wildb_toc.jpg"],
            exampleImg: "/images/zeml-feya-3wildb_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });
    const book9 = await prisma.books.create({
        data: {
            key: "book9",
            title: "Котенок Шмяк идёт к доктору",
            author: "Скоттон Р.",
            seriesId: seriesShmyak.id,
            typeId: null,
            pages: 32,
            age: [1, 7],
            faceImg: "/images/shmyak-to-doctor_face.jpg",
            tocImg: [],
            exampleImg: "/images/shmyak-to-doctor_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: true,
            checked: true
        }
    });
    const book10 = await prisma.books.create({
        data: {
            key: "book10",
            title: "Спокойной ночи, Шмяк!",
            author: "Скоттон Р.",
            seriesId: seriesShmyak.id,
            typeId: null,
            pages: 31,
            age: [1, 7],
            faceImg: "/images/shmyak-good-night_face.jpg",
            tocImg: [],
            exampleImg: "/images/shmyak-good-night_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: true,
            checked: true
        }
    });
    const book11 = await prisma.books.create({
        data: {
            key: "book11",
            title: "Котенок Шмяк и морские истории",
            author: "Скоттон Р.",
            seriesId: seriesShmyak.id,
            typeId: null,
            pages: 31,
            age: [1, 7],
            faceImg: "/images/shmyak-sea-histories_face.jpg",
            tocImg: [],
            exampleImg: "/images/shmyak-sea-histories_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: true,
            checked: true
        }
    });
    const book12 = await prisma.books.create({
        data: {
            key: "book12",
            title: "Новая детская энциклопедия",
            author: null,
            seriesId: null,
            typeId: typeEncic.id,
            pages: 320,
            age: [6, 10],
            faceImg: "/images/new-child-encic_face.jpg",
            tocImg: ["/images/new-child-encic_toc1.jpg", "/images/new-child-encic_toc2.jpg", "/images/new-child-encic_toc3.jpg", "/images/new-child-encic_toc4.jpg"],
            exampleImg: "/images/new-child-encic_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });
    const book13 = await prisma.books.create({
        data: {
            key: "book13",
            title: "Мои эмоции. 20 терапевтических сказок",
            author: "Хонина И., Смирнова Е.",
            seriesId: null,
            typeId: typeLearn.id,
            pages: 63,
            age: [2, 7],
            faceImg: "/images/my-emotions-20-tales_face.jpg",
            tocImg: ["/images/my-emotions-20-tales_toc.jpg"],
            exampleImg: "/images/my-emotions-20-tales_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: true,
            checked: true
        }
    });
    const book14 = await prisma.books.create({
        data: {
            key: "book14",
            title: "Детская энциклопедия динозавров",
            author: null,
            seriesId: null,
            typeId: typeEncic.id,
            pages: 100,
            age: [4, 10],
            faceImg: "/images/child-encic-dinosaurs_face.jpg",
            tocImg: ["/images/child-encic-dinosaurs_toc.jpg"],
            exampleImg: "/images/child-encic-dinosaurs_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });
    const book15 = await prisma.books.create({
        data: {
            key: "book15",
            title: "Вредные советы",
            author: "Остер Г.",
            seriesId: null,
            typeId: null,
            pages: 160,
            age: [4, 10],
            faceImg: "/images/harm-advices-oster_face.jpg",
            tocImg: [],
            exampleImg: "/images/harm-advices-oster_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });
    const book16 = await prisma.books.create({
        data: {
            key: "book16",
            title: "Мейзи Хитчинс. Тайна мальчика из джунглей",
            author: "Вебб Х.",
            seriesId: seriesMeyzi.id,
            typeId: null,
            pages: 124,
            age: [7, 12],
            faceImg: "/images/meizi-secret-boy-from-jungles_face.jpg",
            tocImg: [],
            exampleImg: "/images/meizi-secret-boy-from-jungles_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });
    const book17 = await prisma.books.create({
        data: {
            key: "book17",
            title: "Зоки и Бада",
            author: "Тюхтяевы И. и Л.",
            seriesId: null,
            typeId: null,
            pages: 144,
            age: [4, 7],
            faceImg: "/images/zokies-and-bada_face.jpg",
            tocImg: [],
            exampleImg: "/images/zokies-and-bada_toc.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });
    const book18 = await prisma.books.create({
        data: {
            key: "book18",
            title: "Путешествие в королевство эльфов",
            author: "Савченко Е.",
            seriesId: null,
            typeId: null,
            pages: 143,
            age: [4, 10],
            faceImg: "/images/trip-to-elfs-kingdom_face.jpg",
            tocImg: [],
            exampleImg: "/images/trip-to-elfs-kingdom_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });
    const book19 = await prisma.books.create({
        data: {
            key: "book19",
            title: "Спящая красавица и другие сказки Шарля Перро",
            author: "Перро Ш.",
            seriesId: null,
            typeId: null,
            pages: 47,
            age: [3, 8],
            faceImg: "/images/pero-sleep-beauty-cat-in-boots_face.jpg",
            tocImg: ["/images/pero-sleep-beauty-cat-in-boots_toc.jpg"],
            exampleImg: "/images/pero-sleep-beauty-cat-in-boots_examp.jpg",
            statusFree: true,
            occupiedTo: null,
            ownerId: userDanaArb.id,
            userId: null,
            firstSelfReading: false,
            checked: true
        }
    });

    // Создаем комментарии - после создания книг, так как на них будет ссылка
    const comments1 = await prisma.comments.upsert({
        where: { key: "comments1" },
        update: {
            bookId: book1.id,
            userId: userDanaArb.id,
            text: "Детективная история-приключение в железном придуманном мире роболтов. Очень захватывает детей и читается на одном дыхании. Много ярких картинок. Первая книга из серии.",
        },
        create: {
            key: "comments1",
            bookId: book1.id,
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