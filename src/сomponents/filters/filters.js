import React, { useState } from "react";
import './filters.css'
const Filters = ({ categories, onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };

    // Если тип изменён, сбрасываем категорию
    if (name === "type") {
      updatedFilters.category = "";
    }

    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Уведомляем родителя
  };

  // Определяем список категорий на основе выбранного типа
  const categoryOptions =
    filters.type === "Income"
      ? categories.Income
      : filters.type === "Expense"
      ? categories.Expense
      : categories.all;


  
  return (
    <div>
      <label>
        Тип:
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">Все</option>
          <option value="Income">Доход</option>
          <option value="Expense">Расход</option>
        </select>
      </label>

      <label>
        Категория:
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">Все</option>
          {categoryOptions.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Дата начала:
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
        />
      </label>

      <label>
        Дата окончания:
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default Filters;
