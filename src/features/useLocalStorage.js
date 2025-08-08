// Компонент, который управляет состояние localStorage

"use client";
import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        if (typeof window === "undefined") return initialValue;
        const json = localStorage.getItem(key);
        if (json && json !== "undefined") {
            try {
                return JSON.parse(json);
            } catch {
                return initialValue;
            }
        }
        return initialValue;
    });

    // Загружаем значение из localStorage при монтировании
    useEffect(() => {
        const json = localStorage.getItem(key);
        if (json && json !== "undefined") {
            try {
                setValue(JSON.parse(json));
            } catch (e) {
                setValue(initialValue);
            }
        } else {
            setValue(initialValue);
        }
    }, [key]);

    // Сохраняем значение и отправляем кастомное событие при изменении value
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new Event("localstorage-update-" + key));
    }, [key, value]);

    // Слушаем изменения localStorage из других вкладок и внутри одной вкладки
    useEffect(() => {
        const updateValue = () => {
            const json = localStorage.getItem(key);
            const newValue = json ? JSON.parse(json) : initialValue;
            // Сравниваем значения перед setValue!
            if (JSON.stringify(newValue) !== JSON.stringify(value)) {
                setValue(newValue);
            }
        };
        window.addEventListener("storage", updateValue); // для других вкладок
        window.addEventListener("localstorage-update-" + key, updateValue); // для одной вкладки

        return () => {
            window.removeEventListener("storage", updateValue);
            window.removeEventListener("localstorage-update-" + key, updateValue);
        };
    }, [key, initialValue]);

    return [value, setValue];
}

export default useLocalStorage;