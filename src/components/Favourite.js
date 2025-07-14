import Image from "next/image";
import styles from "@/components/Favourite.module.css";
import {Button} from "@mui/material";
import ModalToTelegramOneBook from "@/components/Modals/ModalToTelegramOneBook";
import ModalComponent from "@/components/Modals/ModalComponent";
import {openModal} from "@/features/modal-slice";

function removeFavourBook(book) {
    let favourites = localStorage.getItem("favourites");
    favourites = favourites ? JSON.parse(favourites) : [];
    if (favourites === []) {alert ('В Избранном нет книг')};
    if (!favourites.includes(book)) {alert ('Данная книга отсутствует в Избранном')}
    favourites = favourites.filter((favouriteItem) => favouriteItem.id !== book.id);
    localStorage.setItem("favourites", JSON.stringify(favourites));
}

function Favourite ({book}) {
    // Данные которые передаются на сервер и далее в телеграмм
    const dataBook = `Читать книгу: ${book.title} (${book.author})`;

    return (
        <div className={styles.favourite}>
            <Image src={book.faceImg[0]} className={styles["favourite__book-img"]} alt="book"/>
            <div className={styles.favourite__descript}>
                <span>{book.title}</span>
                <span>{book.author}</span>
                <span>{book.series}</span>
                <div>
                    <Button type="submit" onClick={() => { dispatch(openModal()) }} >Читать эту книгу!</Button>
                    <span>|</span>
                    <Button type="button" onClick={() => removeFavourBook(book)}>Удалить</Button>
                </div>
            </div>
            <ModalComponent dataBook={dataBook}>
                <ModalToTelegramOneBook dataBook={dataBook} />
            </ModalComponent>
        </div>
    )
}

export default Favourite;