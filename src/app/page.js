import HomeClient from "@/components/HomeClient";

// Серверный компонент (SSR)
export default async function Home() {
    // Лучше явно указывать протокол и порт, если API локальный
    const res = await fetch("http://localhost:3000/api/v1/books", { cache: "no-store" });
    const books = await res.json();

    return <HomeClient books={books} />;
}