import { useState } from 'react';
import api from '../api/axios';

const CATEGORIES = {
  expense: ['Food & Drinks', 'Transport', 'Housing', 'Entertainment', 'Health', 'Shopping', 'Other'],
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
};

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    type: 'expense', amount: '', category: 'Food & Drinks', description: '', date: ''
  });

  const handleTypeChange = (type) => {
    setForm({ ...form, type, category: CATEGORIES[type][0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/transactions', form);
    setForm({ type: 'expense', amount: '', category: 'Food & Drinks', description: '', date: '' });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">New transaction</h2>

      {/* Type toggle */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200">
        <button
          type="button"
          onClick={() => handleTypeChange('expense')}
          className={`flex-1 py-2 text-sm font-medium transition ${
            form.type === 'expense'
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-400 hover:bg-gray-50'
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('income')}
          className={`flex-1 py-2 text-sm font-medium transition ${
            form.type === 'income'
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-400 hover:bg-gray-50'
          }`}
        >
          Income
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Amount</label>
          <input
            type="number"
            placeholder="0.00"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Category</label>
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {CATEGORIES[form.type].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Description</label>
          <input
            type="text"
            placeholder="Optional"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
      >
        Add transaction
      </button>
    </form>
  );
}