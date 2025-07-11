import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Book from "@/components/Books/Book";
import {setBooks} from "@/features/books-slice";
import {selectFilteredBooks, setFilteredBooks} from "@/features/search/search-slice";

function BooksCatalogPreview() {
    const dispatch = useDispatch();
    const filteredBooks = useSelector(selectFilteredBooks);

    useEffect(() => {
        fetch('http://localhost:4000/books')
            .then(res => res.json())
            .then((result) => {
                dispatch(setBooks(result));
                dispatch(setFilteredBooks(result));
            })
            .catch(err => console.log("Ошибка загрузка книг из базы данных:", err));
    }, [dispatch])

    if (filteredBooks.length === 0) {
        return <div>Идет загрузка данных ...</div>;
    }

    return (
        <div className="books__catalog">
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