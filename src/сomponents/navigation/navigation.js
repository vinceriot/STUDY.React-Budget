import { Link } from "react-router-dom"; // Импортируем Link для маршрутизации

import "./navigation.css";

const Navigation = () => {
  return (
    <header className="navigation">
      <h1>Учёт бюджета</h1>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/charts">Графики</Link>
      </nav>
    </header>
  );
};

export default Navigation;
