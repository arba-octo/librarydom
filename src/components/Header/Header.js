"use client";

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import Image from "next/image";
import {changeValueAction, selectSearch, setSearch} from "@//features/search/search-slice";
import {useValue} from "@/features/search/use-value";
import {selectBooks} from "@/features/books-slice";
import {selectFavourites} from "@/features/favourites/favourites-slice";
import styles from "@/components/Header/Header.module.css";

function Header({ books }) {
    // Глобальный state для строки поиска search в заголовке
    const [search, handleChangeSearch] = useValue(selectSearch, changeValueAction);
    // Локальный стейт для первичной загрузки Избранного из localStorage
    const [favourites, setFavourites] = useState([]);
    useEffect(() => {
        // Чтение из localStorage только на клиенте
        const favs = localStorage.getItem("favourites");
        setFavourites(favs ? JSON.parse(favs) : []);
    }, []);

    return (
        <header className={`section ${styles.header}`}>
            <Link href="/librarydom">
                <Image src="/images/ui-img/logo.svg" width={300} height={100} alt="БиблиоDом лого" priority></Image>
            </Link>
            <input
                id="search"
                className={styles.header__search}
                type="text"
                placeholder="Поиск"
                value={search}
                onChange={handleChangeSearch}
                onBlur={() => dispatch(setSearch({search, books}))}
            />
            <div className={styles.header__menu}>
                <Link href='/favourites' className={styles.header__favourites}>{`Избранное (${favourites.length})`}</Link>
            </div>
        </header>
    )
}
export default Header;