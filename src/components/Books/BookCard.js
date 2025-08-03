'use client'
import React, {useState} from "react";
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react';
import {Box, ButtonGroup, Button } from "@mui/material";
import ImageZoom from "@/components/ImageZoom";
import styles from "@/components/Books/BookCard.module.css";

function addFavourBook(book) {
    // Читаем favourites из localStorage, если нет — используем пустой массив
    let favourites = localStorage.getItem("favourites");
    favourites = favourites ? JSON.parse(favourites) : [];
    favourites.push(book); // Добавляем новую книгу
    localStorage.setItem("favourites", JSON.stringify(favourites));
};

function BookCard({book}) {
    console.log('book (приходит в props в BookCard) = ', book);
    // Для галереи, выполненной на Embla Crausel
    const [emblaRef] = useEmblaCarousel();
    // Вытаскиваем из book только картинки - создаем масив с массивом картинок из БД
    const images = [
        ...(book.faceImg ? [book.faceImg] : []),
        ...(Array.isArray(book.tocImg) ? book.tocImg.flat(Infinity) : book.tocImg ? [book.tocImg] : []),
        ...(Array.isArray(book.exampleImg) ? book.exampleImg.flat(Infinity) : book.exampleImg ? [book.exampleImg] : []),
    ];
    // Локальный стейт и отслеживатель для отображения комментариев:
    const [commentsView, setCommentsView] = useState(false);
    const handleClickToView = () => { setCommentsView(!commentsView); }
    // Локальный стект для отображения главной картинки:
    const [selectedImg, setSelectedImg] = useState(images[0]);

    return (
        <div className={styles.book__card}>
           {/* Область для увеличенного изображения */}

               <ImageZoom
                   src={selectedImg}
                   alt="Главная"
                   className={styles.book__mainImg}
                   width={700}
                   height={525}
               />

           <div className={styles["book__descript-content"]}>
               <div className={styles.book__text}>
                  <p className={styles.book__title}>{book.title}</p>
                  { book.author && <p className={styles.book_author}>{book.author}</p> }
                   <table className={styles["book__table-descript"]}>
                            <tbody>
                            {book.series &&
                                <tr>
                                    <td className={styles["table__first-column"]}>Серия</td>
                                    <td>{book.series}</td>
                                </tr>
                            }
                            <tr>
                                <td>Страниц</td>
                                <td>{book.pages}</td>
                            </tr>
                            <tr>
                                <td>Возраст</td>
                                <td>{book.age[0]} - {book.age[1]}</td>
                            </tr>
                            </tbody>
               </table>
                   <button className={styles.book__comments} onClick={handleClickToView}>Отзывы
                       (
                       {book.comments ? book.comments.length : "0"}
                       )
                   </button>
                   {commentsView && book.comments.map((commentItem) =>
                       <div key={commentItem.key} className={styles["book__comments-text"]}>{commentItem.user.name}: {commentItem.text}</div>
                   )}
                   <p className={styles["book__first-self-reading"]}>Подходит для первого самостоятельного чтения: {book.firstSelfReading === true ? "ДА" : "НЕТ"}</p>
                   <Box
                      sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center',
                           '& > *': {
                                        mt: 2,
                                    },
                           }}
                   >
                       <ButtonGroup variant="text" aria-label="Basic button group">
                       <Button onClick={() => addFavourBook(book)}>Добавить в Избранное</Button>
                       <Button>Взять книгу</Button>
                   </ButtonGroup>
                   </Box>
               </div> {/* закрыт book__text */}
               <div className={styles["book__line-gallery"]}>
                   <hr className="line__section-separate"/>

                   {/* Галерея превью */}
                   <div className={styles["embla-gallery"]} ref={emblaRef}>
                       <div className={styles["embla-gallery__container"]}>
                           {images.map((imgItem) => (
                               <img
                                   key={imgItem}
                                   onClick={() => setSelectedImg(imgItem)}
                                   src={imgItem}
                                   alt="Изображение-превью из галереи"
                                   className={styles["embla-gallery__slide"]}
                               />
                           ))}
                       </div>
                   </div>
               </div>
           </div> {/* закрыт book__descript-content */}
        </div>
    )
}

export default BookCard;