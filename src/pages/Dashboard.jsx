import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

export default function Dashboard() {
  const { logout } = useAuth();
  const name = localStorage.getItem('name');
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const { data } = await api.get('/transactions');
    setTransactions(data);
  };

  useEffect(() => { fetchTransactions(); }, []);

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((s, t) => s + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-blue-600 tracking-tight">Spendly</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Hello, {name}</span>
          <button
            onClick={logout}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-lg transition"
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-5 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Income</p>
            <p className="text-2xl font-bold text-green-500">${income.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Expenses</p>
            <p className="text-2xl font-bold text-red-500">${expense.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Form */}
        <TransactionForm onAdd={fetchTransactions} />

        {/* List */}
        <TransactionList transactions={transactions} onDelete={fetchTransactions} />

      </div>
    </div>
  );
}