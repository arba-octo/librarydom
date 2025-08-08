"use client";
;
import Link from "next/link";
import Image from "next/image";
import {changeValueAction, selectSearch, setSearch} from "@//features/search/search-slice";
import {useValue} from "@/features/search/use-value";
import styles from "@/components/Header/Header.module.css";
import useLocalStorage from "@/features/useLocalStorage";

function Header({ books }) {
    // Глобальный state для строки поиска search в заголовке
    const [search, handleChangeSearch] = useValue(selectSearch, changeValueAction);
    // Локальный стейт для первичной загрузки Избранного из localStorage
    const [favourites] = useLocalStorage("favourites", []);

    return (
        <header className={`section ${styles.header}`}>
            <Link href="/">
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
                <Link href="/favourites" className={styles.header__favourites}>{`Избранное (${favourites.length})`}</Link>
            </div>
        </header>
    )
}
export default Header;