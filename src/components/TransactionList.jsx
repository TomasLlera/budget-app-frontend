import api from '../api/axios';

export default function TransactionList({ transactions, onDelete }) {
  const handleDelete = async (id) => {
    await api.delete(`/transactions/${id}`);
    onDelete();
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {transactions.map(t => (
        <li key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <span>{t.date} · {t.category} · {t.description}</span>
          <span style={{ color: t.type === 'income' ? 'green' : 'red', fontWeight: 'bold' }}>
            {t.type === 'income' ? '+' : '-'}${t.amount}
          </span>
          <button onClick={() => handleDelete(t.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}