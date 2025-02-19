import React from 'react'

const TransactionFilters = ({ filterCategory, setFilterCategory, filterDate, setFilterDate }) => {
  return (
    <>
    <div className="flex gap-4 mb-6">
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="border px-3 py-2 rounded-md">
            <option value="all">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Income">Income</option>
            <option value="Shopping">Shopping</option>
        </select>
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="border px-3 py-2 rounded-md" />
    </div>
    </>
  )
}

export default TransactionFilters