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

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Hola, {name} 👋</h2>
        <button onClick={logout}>Cerrar sesión</button>
      </div>

      <div style={{ display: 'flex', gap: 16, margin: '24px 0' }}>
        <div style={{ flex: 1, padding: 16, background: '#e6f4ea', borderRadius: 8 }}>
          <p>Ingresos</p>
          <h3 style={{ color: 'green' }}>${income.toFixed(2)}</h3>
        </div>
        <div style={{ flex: 1, padding: 16, background: '#fce8e6', borderRadius: 8 }}>
          <p>Gastos</p>
          <h3 style={{ color: 'red' }}>${expense.toFixed(2)}</h3>
        </div>
        <div style={{ flex: 1, padding: 16, background: '#e8f0fe', borderRadius: 8 }}>
          <p>Saldo</p>
          <h3>${(income - expense).toFixed(2)}</h3>
        </div>
      </div>

      <h3>Nueva transacción</h3>
      <TransactionForm onAdd={fetchTransactions} />

      <h3 style={{ marginTop: 32 }}>Movimientos</h3>
      <TransactionList transactions={transactions} onDelete={fetchTransactions} />
    </div>
  );
}