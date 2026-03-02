import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { decryptPaymentData } from "../api/paymentApi";

export function Failure() {
    const [searchParams] = useSearchParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetails() {
            const encryptedData = searchParams.get("data");

            if (encryptedData) {
                try {
                    const decrypted = await decryptPaymentData(encryptedData);
                    setDetails({
                        txId: decrypted.merchantTxnId || decrypted.OrderNo || decrypted.orderNo || "N/A",
                        amount: decrypted.amount || decrypted.amount || "N/A",
                        status: decrypted.status || "FAILED"
                    });
                } catch (err) {
                    console.error("Failed to decrypt", err);
                    setDetails({
                        txId: "Error loading details",
                        amount: "-",
                        status: "UNKNOWN"
                    });
                }
            } else {
                setDetails({
                    txId: searchParams.get("merchantTxnId") || searchParams.get("OrderNo") || searchParams.get("orderNo") || "N/A",
                    amount: searchParams.get("amount") || searchParams.get("TotalAmount") || "N/A",
                    status: searchParams.get("status") || "FAILED"
                });
            }
            setLoading(false);
        }

        fetchDetails();
    }, [searchParams]);

    if (loading) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center">
                <p className="text-gray-500">Retrieving transaction details...</p>
            </div>
        );
    }

    const { txId, amount, status } = details;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center border border-red-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Payment Failed</h2>
            <p className="text-gray-500 mt-2">The transaction was declined or cancelled.</p>

            <div className="mt-6 border-t border-gray-100 pt-4 text-left space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-medium text-gray-900">{txId}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-medium text-gray-900">₹{amount}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="font-bold text-red-600 uppercase">{status}</span>
                </div>
            </div>

            <div className="mt-8">
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
