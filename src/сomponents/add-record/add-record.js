import React, { useState, useEffect } from "react";
import './add-record.css'
function BudgetForm({ onAddRecord, editingRecord, categories }) {
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingRecord) {
      setType(editingRecord.type);
      setCategory(editingRecord.category);
      setAmount(editingRecord.amount);
      setDescription(editingRecord.description);
      setDate(editingRecord.date);
    } else {
      resetForm();
    }
  }, [editingRecord]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const record = { type, category, amount: parseFloat(amount), description, date };
    onAddRecord(record);
    resetForm();
  };

  const resetForm = () => {
    setType("Expense");
    setCategory("");
    setAmount("");
    setDescription("");
    setDate("");
    
  };
  
  

  // Получаем категории для выбранного типа
  const categoryOptions =
    type === "Income" ? categories.Income : categories.Expense ;

  return (
    <section>
      <h2>{editingRecord ? "Изменить запись" : "Добавить запись"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Тип:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Expense">Расход</option>
            <option value="Income">Доход</option>
          </select>
        </label>

        <label>
          Категория:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
            <option value="">Выберите категорию</option>
            {categoryOptions.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Сумма:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        <label>
          Описание:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Дата:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <button type="submit">
          {editingRecord ? "Сохранить изменения" : "Добавить"}
        </button>
      </form>
    </section>
  );
}


export default BudgetForm;
