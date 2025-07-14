// Компонент, который управляет состояние localStorage

"use client";
import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(initialValue);

    // Чтение из localStorage при первом рендере
    useEffect(() => {
        const json = localStorage.getItem(key);
        if (json !== null) setValue(JSON.parse(json));
    }, [key]);

    // Сохранять в localStorage при изменении value
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
export default useLocalStorage;