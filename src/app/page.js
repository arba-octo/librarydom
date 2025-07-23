import HomeClient from "@/components/HomeClient";

// Серверный компонент (SSR)
export default async function Home() {
    const host =
        typeof window === "undefined" && process.env.API_URL
            ? process.env.API_URL
            : "";
    let books = []; // Заглушка
    try {
        const res = await fetch(`${host}/api/v1/books-with-comments`, { cache: "no-store" });
        if (!res.ok) { throw new Error('Failed to fetch') }
        books = await res.json();
    }
    catch (error) { console.error('Fetch error:', error) }

    return <HomeClient books={books} />;
}