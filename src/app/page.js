import HomeClient from "@/components/HomeClient";
import { getBooks } from "@/lib/getBooks";

// Серверный компонент (SSR)
export default async function Home() {
    const host = process.env.API_URL || "http://localhost:3000";
    console.log('host = ', host);
    let books = []; // Заглушка
    try {
        books = await getBooks();
    }
    catch (error) { console.error('Ошика в Fetch (catch) в компоненте Home:', error) }
    console.log('books (загрузились с сервера в Home)  = ', books);
    return <HomeClient books={books} />;
}