import './balance.css'
function Balance({ budgetData }) {
    const balance = budgetData.reduce(
        (total, item) => (item.type === "Income" ? total + item.amount : total - item.amount),
        0
    );

    return (
        <section>
            <h2>Состояние счёта</h2>
            <p className={balance < 0 ? "expense" : "income"}>Баланс: {balance.toLocaleString()} ₽</p>
        </section>
    );
}

export default Balance;
