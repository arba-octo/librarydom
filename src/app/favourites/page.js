'use client';

import Header from "@/components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {selectFavourites} from "@/features/favourites/favourites-slice";
import Favourite from "@/components/Favourite";
import { Button } from "@mui/material";
import ModalComponent from "@/components/Modals/ModalComponent";
import ModalToTelegramAllBook from "@/components/Modals/ModalToTelegramAllBooks";
import {openModal} from "@/features/modal-slice";
import {useState} from "react";
import useLocalStorage from "@/features/useLocalStorage";

function FavouritesPage() {
    const [favourites, setFavourites] = useLocalStorage("favourites", []);
    const dispatch = useDispatch();
    const dataBooks = favourites.reduce((acc, favourItem) => {
        return acc + `/n${favourItem.title} (${favourItem.author}); `;
    }, "Читать несколько книг: ");

    return (
        <div className="section">
            <Header />
            <div className="favour-content">
                <h2>Избранное</h2>
                <div className="favour-container">
                    {favourites.map(favourItem => (
                        <Favourite book={favourItem} key={favourItem.id} />
                    ))}
                </div>
                <Button variant="text" onClick={() => { dispatch(openModal) }} sx={{ mt: 5 }}>Читать все книги из избранного ({favourites.length})</Button>
                <ModalComponent>
                    <ModalToTelegramAllBook dataBook={dataBooks} />
                </ModalComponent>
            </div>
        </div>
    )
}
export default FavouritesPage;