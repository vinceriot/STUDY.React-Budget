import React from "react";
import "./navigation.css";

const Navigation = () => {
  return (
    <header className="navigation">
      <h1>Учёт бюджета</h1>
      <nav>
        <a href="/" className="active">Главная</a>
        <a href="/charts">Графики</a>
      </nav>
    </header>
  );
};

export default Navigation;
