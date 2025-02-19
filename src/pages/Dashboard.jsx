import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions, addTransaction } from '../redux/slices/transactionSlice';
import { useNavigate } from 'react-router-dom';
import TransactionFilters from '../components/TransactionFilters';

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = sessionStorage.getItem('name');
    const transactions = useSelector((state) => state.transactions.transactions) || [];
    const totalBalance = transactions.reduce((sum, transaction) => sum + Number(transaction.amount), 0)

    const [filterCategory, setFilterCategory] = useState('all');
    const [filterDate, setFilterDate] = useState('');
    const [newTransaction, setNewTransaction] = useState({
        date: '',
        description: '',
        amount: '',
        category: ''
    });

    const nav = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            dispatch(fetchTransactions());
        }
    }, [dispatch]);


    const filteredTransactions = transactions.filter(transaction => {
        const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
        const matchesDate = !filterDate || transaction.date === filterDate;
        return matchesCategory && matchesDate;
    })

    const handleChange = (e) => {
        setNewTransaction(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleAddTransaction = (e) => {
        e.preventDefault();
        console.log("Adding Transaction :", newTransaction)
        if (!newTransaction.date || !newTransaction.description || !newTransaction.amount || !newTransaction.category) {
            return;
        }
        dispatch(addTransaction(newTransaction));
        setNewTransaction({ date: '', description: '', amount: '', category: '' });
    }

    const handleLogout = () => {
        if (sessionStorage.getItem('token')) {
            sessionStorage.clear();
            nav("/");
        }
    }


    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <span>Welcome, {user}</span>
                    <button onClick={handleLogout} className="bg-red-600 text-white text-sm py-2 px-4 rounded-md hover:bg-red-700">Logout</button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold">Total Balance</h2>
                    <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>₹{totalBalance.toFixed(2)}</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>
                    <form onSubmit={handleAddTransaction} className="space-y-4">
                        <div className="grid grid-cols-4 gap-4">
                            <input type="date" name='date' value={newTransaction.date} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />

                            <input type="text" name='description' placeholder="Description" value={newTransaction.description} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />

                            <input type="number" name='amount' placeholder="Amount" value={newTransaction.amount} onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })} className="w-full border rounded-md px-3 py-2" required />

                            <select value={newTransaction.category} onChange={handleChange} name='category' className="w-full border rounded-md px-3 py-2" required>
                                <option value="">Select Category</option>
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Income">Income</option>
                                <option value="Shopping">Shopping</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Add Transaction</button>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Transactions</h2>
                    <TransactionFilters
                        filterCategory={filterCategory}
                        setFilterCategory={setFilterCategory}
                        filterDate={filterDate}
                        setFilterDate={setFilterDate}
                    />
                    {/* Transactions */}
                    <div className="space-y-4">
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map(transaction => (
                                <div
                                    key={transaction._id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex flex-col mb-2 sm:mb-0">
                                        <span className="font-medium">{transaction.description}</span>
                                        <span className="text-sm text-gray-500">{transaction.date}</span>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                                        <span className="px-2 py-1 text-sm bg-gray-100 rounded">
                                            {transaction.category}
                                        </span>
                                        <span className={`font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            ₹{Math.abs(transaction.amount).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No transactions found. Start adding some!</p>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
