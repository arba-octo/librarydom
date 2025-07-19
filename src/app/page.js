import HomeClient from "@/components/HomeClient";

// Серверный компонент (SSR)
export default async function Home() {
    const host =
        typeof window === "undefined" && process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "";
    const res = await fetch(`${host}/api/v1/books`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error('Failed to fetch');
    };
    const books = await res.json();

    return <HomeClient books={books} />;
}