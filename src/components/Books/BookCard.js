import React, {useState} from "react";
import {useDispatch} from "react-redux";
import useEmblaCarousel from 'embla-carousel-react';
import {Box, ButtonGroup, Button } from "@mui/material";
import {addFavourite} from "@/features/favourites/favourites-slice";
import ImageZoom from "@/components/ImageZoom";


function BookCard({book}) {
    // Для галереи, выполненной на Embla Crausel
    const [emblaRef] = useEmblaCarousel()
    const dispatch = useDispatch();
    // Вытаскиваем из book только картинки - создаем масив с массивом картинок из БД
    const images = [
        ...(book.faceImg ? [book.faceImg] : []),
        ...(Array.isArray(book.tocImg) ? book.tocImg.flat(Infinity) : book.tocImg ? [book.tocImg] : []),
        ...(Array.isArray(book.exampleImg) ? book.exampleImg.flat(Infinity) : book.exampleImg ? [book.exampleImg] : []),
    ];
    // Локальный стейт и отслеживатель для отображения комментариев:
    const [comments, setComments] = useState(false);
    const handleClickToView = () => { setComments(!comments); }
    // Локальный стект для отображения главной картинки:
    const [selectedImg, setSelectedImg] = useState(images[0]);

    return (
        <div className="book__card">
           {/* Область для увеличенного изображения */}
           <ImageZoom
               src={selectedImg}
               alt="Главная"
               className="book__mainImg"
               width="auto"
               height="600px"
           />
           <div className="book__descript-content">
               <div className="book__text">
                   <p className="book__title">{book.title}</p>
                   <p className="book_author">{book.author}</p>
                       <table className="book__text-descript">
                            <tbody>
                            <tr>
                                <td className="table__first-column">Серия</td>
                                <td>{book.series}</td>
                            </tr>
                            <tr>
                                <td>Страниц</td>
                                <td>{book.pages}</td>
                            </tr>
                            <tr>
                                <td>Возраст</td>
                                <td>{book.age[0]} - {book.age[1]}</td>
                            </tr>
                            <tr>
                                <td>
                                    <button className="book__comments" onClick={handleClickToView}>Отзывы
                                        ({book.comments.length})
                                    </button>
                                    {comments && book.comments.map((commentItem) => {
                                        return <div>{commentItem.user}: {commentItem.text}</div>
                                    })}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                       <p>Подходит для первого самостоятельного
                            чтения: {book.firstSelfReading === true ? "ДА" : "НЕТ"}
                       </p>
                       <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                '& > *': {
                                    m: 0,
                                },

                            }}
                       >
                            <ButtonGroup variant="text" aria-label="Basic button group">
                                <Button onClick={() => dispatch(addFavourite(book))}>Добавить в Избранное</Button>
                                <Button>Взять книгу</Button>
                            </ButtonGroup>
                       </Box>
                   </div>
                   <hr className="line__section-separate"/>

                   {/* Галерея превью */}
                   <div className="embla-gallery" ref={emblaRef}>
                       <div className="embla-gallery__container">
                            {images.map((imgItem) => (
                                    <img
                                        key={imgItem}
                                        onClick={() => setSelectedImg(imgItem)}
                                        src={imgItem} alt="Изображение"
                                        className="embla-gallery__slide"
                                    />
                            ))}
                       </div>
                   </div>

               </div>
           </div>
    )
}

export default BookCard;