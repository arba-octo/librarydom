"use client"; // обязательно для клиентского компонента
import { useEffect, useState } from "react";
import styles from "@/components/SideBar/SideBar.module.css";
import Image from "next/image";
import SideBarSearch from "@/components/SideBar/SideBarSearch";
import { selectAllSeries, setSeries } from "@/features/series-slice";
import {useDispatch, useSelector} from "react-redux";

function SideBar() {
    const dispatch = useDispatch();
    const allSeries = useSelector(selectAllSeries);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/v1/series")
            .then((res) => res.json())
            .then((data) => {
                console.log('data (приходит в fetch из БД в SideBar (ожидаются все серии книг)): ', data);
                dispatch(setSeries(data));
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Загрузка серий книг...</div>;

    return (
        <div className={styles["side-bar"]}>
            <div className={`${styles["side-bar__item"]} ${styles["side-bar__search"]}`}>
                <div className={`${styles["side-bar__title"]} ${styles["side-bar__title-search"]}`}>
                    <Image src="/images/ui-img/icon_seach.png" alt="Иконка к тексту" width={24} height={24}/>
                    <h2>Найти книгу</h2>
                </div>
                <SideBarSearch seriesFromBD={allSeries}/>
            </div>
        </div>
    );
};
export default SideBar;