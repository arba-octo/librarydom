import BooksCatalogPreview from "@/components/Books/BooksCatalogPreview";
import FiltersPanel from "@/components/FiltersPanel";
import styles from "@/components/Books/Books.module.css";

function Books() {
    return (
        <div className={styles.books}>
            <h2>Книги в каталоге:</h2>
            <FiltersPanel />
            <BooksCatalogPreview />
        </div>
    )
}

export default Books;