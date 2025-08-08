import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectModal, openModal} from "@/features/modal-slice";
import Image from "next/image";
import styles from "@/components/Favourite.module.css";
import {Button} from "@mui/material";
import ModalToTelegramOneBook from "@/components/Modals/ModalToTelegramOneBook";
import ModalComponent from "@/components/Modals/ModalComponent";
import useLocalStorage from "@/features/useLocalStorage";

function Favourite ({book}) {
    const [isClient, setIsClient] = useState(false); // нужны для избежания ошибки гидратации
    const [favourites, setFavourites] = useLocalStorage("favourites", []); //
    const modal = useSelector(selectModal); // useState использовать нельзя, т.к. openModal нужен будет в 2х разных компонентах!
    const dispatch = useDispatch();
    useEffect(() => { setIsClient(true); }, []);
    if (!isClient) { return null; }
    if (favourites.length === 0) {return (<p>В Избранном нет книг</p>)};
    const handleOpenModal = () => {
        dispatch(openModal());
        console.log("Прошел dispatch(openModal)")
    }

    const removeFavourBook = () => {
        const newFavourites = favourites.filter((favouriteItem) => favouriteItem.id !== book.id);
        setFavourites(newFavourites);
    }
    // Данные которые передаются на сервер и далее в телеграмм
    const dataBook = `Читать книгу: ${book.title} (${book.author})`;

    return (
        <div className={styles.favourite}>
            <Image
                src={book.faceImg}
                alt="book"
                width={60}
                height={75}
            />
            <div className={styles["favourite__descript"]}>
                <span>{book.title}</span>
                <span>{book.author}</span>
                <span>{book.series}</span>
                <div>
                    <Button type="submit" onClick={handleOpenModal} >Читать эту книгу!</Button>
                    <span>|</span>
                    <Button type="button" onClick={() => removeFavourBook()}>Удалить</Button>
                </div>
            </div>
            { modal &&
                <ModalComponent dataBook={dataBook} >
                    <ModalToTelegramOneBook dataBook={dataBook} />
                </ModalComponent>
            }
        </div>
    )
}

export default Favourite;