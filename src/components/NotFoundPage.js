import Header from "./Header/Header";
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div>
            <Header />
            <div className="section not-found">
                <span>Запрашиваемая вами тсраница не найдена (ошибка 404). </span>
                <span>Рекомендуем перейти на </span> <Link to="/library-dom">Главную страницу</Link>
            </div>
        </div>
    )
}
export default NotFoundPage;