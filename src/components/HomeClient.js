'use client';

import Header from "@/components/Header/Header";
import SideBar from "@/components/SideBar/SideBar";
import LineSeparate from "@/components/LineSeparate";
import Books from "@/components/Books/Books";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setBooks} from "@/features/books-slice";
import {setFilteredBooks} from "@/features/search/search-slice";

export default function HomeClient({ books }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setBooks(books));
        dispatch(setFilteredBooks(books));
    }, [books, dispatch])

    return (
        <div>
            <Header books={books} />
            <LineSeparate />
            <div className="section content">
                <SideBar />
                <Books />
            </div>
        </div>
    );
}