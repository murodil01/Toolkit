import React, { useState, useEffect } from "react";

const DebtManager = () => {
  const [debtors, setDebtors] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("debtors")) || [];
    setDebtors(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("debtors", JSON.stringify(debtors));
  }, [debtors]);

  const handleAdd = () => {
    if (!name || !amount) return;
    const newDebtor = { id: Date.now(), name, amount: parseFloat(amount), paid: false };
    setDebtors([...debtors, newDebtor]);
    setName("");
    setAmount("");
  };

  const togglePaid = (id) => {
    const updated = debtors.map(d => d.id === id ? { ...d, paid: !d.paid } : d);
    setDebtors(updated);
  };

  const handleDelete = (id) => {
    setDebtors(debtors.filter(d => d.id !== id));
  };

  const totalDebt = debtors.reduce((sum, d) => d.paid ? sum : sum + d.amount, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Qarzdorlar</h2>
      <div className="flex gap-2 mb-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Ism" className="border p-2" />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Qarz (so'm)" className="border p-2" />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2">Qo‘shish</button>
      </div>

      <ul>
        {debtors.map(d => (
          <li key={d.id} className="flex justify-between items-center border-b py-2">
            <div>
              <span className="font-semibold">{d.name}</span> - {d.amount} so'm 
              {d.paid && <span className="text-green-500 ml-2">(To‘langan)</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => togglePaid(d.id)} className="text-sm bg-yellow-300 px-2 py-1 rounded">
                {d.paid ? "To‘lanmadi" : "To‘landi"}
              </button>
              <button onClick={() => handleDelete(d.id)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">
                O‘chirish
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 font-bold">Jami Qarz: {totalDebt.toLocaleString()} so'm</div>
    </div>
  );
};

export default DebtManager;
