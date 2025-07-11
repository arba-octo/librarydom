import BooksCatalogPreview from "@/components/Books/BooksCatalogPreview";
import FiltersPanel from "@/components/FiltersPanel";

function Books() {
    return (
        <div className="books">
            <h2 className="books__title">Книги в каталоге:</h2>
            <FiltersPanel />
            <BooksCatalogPreview />
        </div>
    )
}

export default Books;