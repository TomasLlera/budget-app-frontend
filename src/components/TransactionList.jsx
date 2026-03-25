import api from '../api/axios';

export default function TransactionList({ transactions, onDelete }) {
  const handleDelete = async (id) => {
    await api.delete(`/transactions/${id}`);
    onDelete();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">No transactions yet</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {transactions.map(t => (
            <li
              key={t.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {t.category || 'No category'}
                </span>
                <span className="text-xs text-gray-400">
                  {t.description || '—'} · {t.date?.slice(0, 10)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-semibold ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {t.type === 'income' ? '+' : '-'}${Number(t.amount).toFixed(2)}
                </span>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-gray-300 hover:text-red-400 transition text-lg leading-none"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}