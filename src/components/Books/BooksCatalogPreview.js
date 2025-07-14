'use client';

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Book from "@/components/Books/Book";
import {setBooks} from "@/features/books-slice";
import {selectFilteredBooks, setFilteredBooks} from "@/features/search/search-slice";
import styles from "@/components/Books/BooksCatalogPreview.module.css";

function BooksCatalogPreview() {
    const dispatch = useDispatch();
    const filteredBooks = useSelector(selectFilteredBooks);
    useEffect(() => {
        fetch('/api/v1/books')
            .then(res => res.json())
            .then((result) => {
                dispatch(setBooks(result));
                dispatch(setFilteredBooks(result));
            })
            .catch(err => console.log("Ошибка загрузка книг из базы данных:", err));
    }, [dispatch])

    console.log('filteredBooks (из redux в BooksCatalogPreview) = ', filteredBooks);
    if (filteredBooks.length === 0) {
        return <div>Идет загрузка данных с сервера (книги) ...</div>;
    }

    return (
        <div className={styles.books__catalog}>
            {filteredBooks.map((itemBook) => {
                return (
                    <Book
                        book={itemBook}
                        key={itemBook.id}
                    />
                )
            })}
        </div>
    )
}
export default BooksCatalogPreview;