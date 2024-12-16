import React, { useState, useEffect } from "react";

import Balance from "../balance/balance";
import BudgetForm from "../budget-form/budget-form";
import Filters from "../filters/filters";
import BudgetTable from "../records-table/records-table";
import Navigation from "../navigation/navigation";
import BudgetCharts from "../budget-charts/budget-charts";
import Notification from "../notification/notification"; 

import './App.css';


const App = () => {
  const [budgetData, setBudgetData] = useState(() => JSON.parse(localStorage.getItem('budgetData')) || []);
  const [filteredData, setFilteredData] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [notification, setNotification] = useState(null);

  const categories = {
    Income: ["Зарплата", "Подарки", "Инвестиции"],
    Expense: ["Транспорт", "Еда", "Одежда", "Медицина", "Подарки"],
    all: ["Зарплата", "Подарки", "Инвестиции", "Транспорт", "Еда", "Одежда", "Медицина"],
  };
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
    setFilteredData(budgetData);
  }, [budgetData]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Уведомление исчезает через 3 секунды
  };

  const handleAddRecord = (record) => {
    let updatedData;

    if (editingRecord !== null) {
      updatedData = [...budgetData];
      updatedData[editingRecord] = { ...record, id: budgetData[editingRecord].id }; // Сохраняем текущий id
      setEditingRecord(null);
      showNotification("Запись успешно отредактирована");
    } else {
      const maxId = budgetData.length > 0 ? Math.max(...budgetData.map((r) => r.id || 0)) : 0;
      const newRecord = { ...record, id: maxId + 1 };
      updatedData = [...budgetData, newRecord];
      showNotification("Новая запись добавлена");
    }

    updatedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    setBudgetData(updatedData);
    setFilteredData(updatedData);
  };

  const handleDeleteRecord = (index) => {
    const updatedData = budgetData.filter((_, i) => i !== index);
    setBudgetData(updatedData);
    setFilteredData(updatedData);
    showNotification("Запись успешно удалена");
  };

  const handleFilterChange = (filters) => {
    const { type, category, startDate, endDate } = filters;

    const filtered = budgetData.filter((record) => {
      const matchesType = !type || record.type === type;
      const matchesCategory = !category || record.category === category;
      const matchesStartDate = !startDate || new Date(record.date) >= new Date(startDate);
      const matchesEndDate = !endDate || new Date(record.date) <= new Date(endDate);

      return matchesType && matchesCategory && matchesStartDate && matchesEndDate;
    });

    setFilteredData(filtered);
  };

  return (
    <div className="app">
      <Navigation />
      <Balance budgetData={budgetData} />
      <BudgetForm
        onAddRecord={handleAddRecord}
        editingRecord={editingRecord !== null ? budgetData[editingRecord] : null}
        categories={categories}
      />
      <button onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
      </button>
      {showFilters && (
        <Filters
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      )}
      <BudgetTable
        budgetData={filteredData}
        onEditRecord={(index) => setEditingRecord(index)}
        onDeleteRecord={handleDeleteRecord}
      />
      <BudgetCharts budgetData={budgetData} />
      {notification && <Notification message={notification} />} {/* Уведомление */}
    </div>
  );
};

export default App;
