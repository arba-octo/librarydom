'use client';

import {useSelector} from "react-redux";
import Book from "@/components/Books/Book";
import {selectFilteredBooks} from "@/features/search/search-slice";
import styles from "@/components/Books/BooksCatalogPreview.module.css";

function BooksCatalogPreview() {
    const filteredBooks = useSelector(selectFilteredBooks);

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