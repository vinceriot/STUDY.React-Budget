import './records-table.css'
function BudgetTable({ budgetData, onEditRecord, onDeleteRecord }) {
    return (
        <section>
            <h2>Таблица записей</h2>
            <table>
                <thead>
                    <tr>
                        <th>Категория</th>
                        <th>Описание</th>
                        <th>Сумма</th>
                        <th>Дата</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {budgetData.map((item, index) => (
                        <tr key={index} className={item.type === "Expense" ? "expense" : "income"}>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
                            <td>{item.amount.toLocaleString()} ₽</td>
                            <td>{new Intl.DateTimeFormat("ru").format(new Date(item.date))}</td>
                            <td className="actions">
                                <button onClick={() => onEditRecord(index)}>✏️</button>
                                <button onClick={() => onDeleteRecord(index)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default BudgetTable;