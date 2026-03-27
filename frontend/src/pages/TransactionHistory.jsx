import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { getPaymentHistory } from "../api/paymentApi";

export function TransactionHistory() {
  const [roll, setRoll] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!roll.trim()) return;

    setLoading(true);
    try {
      const data = await getPaymentHistory(roll);
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
      setTransactions([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Transaction History</h2>
      <p className="text-gray-600 text-sm mb-6">
        Enter your Roll Number, Registration Number, or College Code to view past online payments and download receipts.
      </p>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-end mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex-grow w-full">
          <Input
            label="Roll / Reg. No"
            placeholder="e.g. 21022P0535"
            value={roll}
            onChange={(e) => setRoll(e.target.value.toUpperCase())}
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full sm:w-auto mt-2 sm:mt-0 px-8">
          {loading ? "Searching..." : "View History"}
        </Button>
      </form>

      {searched && !loading && transactions.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No transactions found for <strong>{roll}</strong>.</p>
        </div>
      )}

      {transactions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {transactions.map((tx) => {
                const isSuccess = tx.status === 'SUCCESS' || tx.status === 'PAID';
                const isFail = tx.status === 'FAILED';
                const statusColor = isSuccess ? 'bg-green-100 text-green-800' : isFail ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800';

                return (
                  <tr key={tx.merchantTxnId} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(tx.createdAt || tx.updatedAt).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {(tx.payment_category || "UNKNOWN").replace(/_/g, " ")}
                      <div className="text-xs text-gray-500 font-mono mt-0.5">{tx.merchantTxnId}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold">₹ {tx.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusColor}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/payment/success?merchantTxnId=${tx.merchantTxnId}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
                      >
                        View Receipt
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
