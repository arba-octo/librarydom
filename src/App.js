import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from "../../dev/library/library-dom/src/pages/MainPage";
import FavouritesPage from "../../dev/library/library-dom/src/pages/FavouritesPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
      <Routes>
          <Route path="/library-dom" element={<MainPage />}/>
          <Route path="/favourites" element={ <FavouritesPage /> }/>
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
}

export default App;