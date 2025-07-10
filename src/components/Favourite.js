import {useDispatch} from "react-redux";
import { removeFavourite } from "../../../dev/library/library-dom/src/features/favourites/favourites-slice";
import {Button} from "@mui/material";
import ModalToTelegramOneBook from "./Modals/ModalToTelegramOneBook";
import {openModal} from "../../../dev/library/library-dom/src/features/modal-slice";
import ModalComponent from "./Modals/ModalComponent";

function Favourite ({book}) {
    // Данные которые передаются на сервер и далее в телеграмм
    const dataBook = `Читать книгу: ${book.title} (${book.author})`;
    // Используется при удалении книги из Избранного и открытия модального окна
    const dispatch = useDispatch();

    return (
        <div className="favourite">
            <img src={book.faceImg[0]} className="favourite__book-img" alt="book"/>
            <div className="favourite__descript">
                <span className="favourite__descript_item">{book.title}</span>
                <span className="favourite__descript_item">{book.author}</span>
                <span className="favourite__descript_item">{book.series}</span>
                <div>
                    <Button type="submit" onClick={() => { dispatch(openModal()) }} >Читать эту книгу!</Button>
                    <span>|</span>
                    <Button type="button" className="delete" onClick={() => {dispatch(removeFavourite(book))}}>Удалить</Button>
                </div>
            </div>
            <ModalComponent dataBook={dataBook}>
                <ModalToTelegramOneBook dataBook={dataBook} />
            </ModalComponent>
        </div>
    )
}

export default Favourite;