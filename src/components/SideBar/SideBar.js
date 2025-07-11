import {useEffect, useState} from "react";
import searchIcon from "@/images/icon_seach.png";
import addBook from "@/images/icon-book.svg";
import SideBarSearch from "@/components/SideBar/SideBarSearch";
import SideBarAddBook from "@/components/SideBar/SideBarAddBook";
import LineSeparate from "@/components/LineSeparate";
import {selectAllSeries, setSeries} from "@/features/series-slice";
import {useDispatch, useSelector} from "react-redux";

function SideBar() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenAddBook = () => {
        setIsOpen(true);
    }
    useEffect(() => {
        fetch('http://localhost:4000/series')
            .then(res => res.json())
            .then((result) => {
                dispatch(setSeries(result))
            })
            .catch((error) => {console.log(error)})
    }, [dispatch]);
    const series = useSelector(selectAllSeries);

    return (
        <div className="side-bar">
            <div className="side-bar__item side-bar__search">
                <div className="side-bar__title side-bar__title-search">
                    <img src={searchIcon} alt="Иконка к тексту"/>
                    <h2>Найти книгу</h2>
                </div>
                <SideBarSearch seriesFromBD={series}/>
            </div>
            {/* Скрываем добавление книг пока не настроен сервер
            <div className="side-bar__item side-bar__add-book" onClick={handleOpenAddBook}>
                <div className="side-bar__title side-bar__title_add-book">
                    <img src={addBook} alt="Добавить"/>
                    <h2>Добавить свою книгу</h2>
                </div>
                    {isOpen === false && <LineSeparate after="after" />}
                    {isOpen === true && <LineSeparate />}
                    {isOpen === true && <SideBarAddBook seriesFromBD={series}/>}
            </div>
            */}
        </div>
    )
}

export default SideBar;