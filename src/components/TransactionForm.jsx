import { useState } from 'react';
import api from '../api/axios';

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    type: 'expense', amount: '', category: '', description: '', date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/transactions', form);
    setForm({ type: 'expense', amount: '', category: '', description: '', date: '' });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
      <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
        <option value="income">Ingreso</option>
        <option value="expense">Gasto</option>
      </select>
      <input placeholder="Monto" type="number" value={form.amount}
        onChange={e => setForm({ ...form, amount: e.target.value })} required />
      <input placeholder="Categoría (ej: comida)" value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })} />
      <input placeholder="Descripción" value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })} />
      <input type="date" value={form.date}
        onChange={e => setForm({ ...form, date: e.target.value })} required />
      <button type="submit">Agregar</button>
    </form>
  );
}