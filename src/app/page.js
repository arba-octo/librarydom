import HomeClient from "@/components/HomeClient";
import { getBooks } from "@/lib/getBooks";

// Серверный компонент (SSR) - загружает книги из базы и передает в props (в глобальный стейт их сразу передать нельзя так как это серверный компонент)
export default async function Home() {
    const host = process.env.API_URL || "http://localhost:3000";
    let books = []; // Заглушка
    try {
        books = await getBooks();
    }
    catch (error) { console.error('Ошика в Fetch (catch) в компоненте Home:', error) }
    return <HomeClient books={books} />;
}