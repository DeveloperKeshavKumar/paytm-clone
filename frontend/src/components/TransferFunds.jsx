import { useState } from 'react';
import { transferFunds } from '../service/api';

export const TransferFunds = ({ onSuccess, token }) => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const transferData = {
                amountToTransfer: parseFloat(amount),
                receiverId: recipient
            };

            const response = await transferFunds(transferData, token);

            if (response.data) {
                console.log('Transfer successful:', response.data.message);
                console.log('Updated balance:', response.data.balance);

                // Reset form
                setAmount('');
                setRecipient('');

                // Call success callback with updated balance
                onSuccess(response.data.balance);
            }
        } catch (error) {
            console.error('Transfer failed:', error);

            // Handle different error scenarios
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.message) {
                setError(error.message);
            } else {
                setError('Transfer failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Transfer Funds</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                        Recipient User ID
                    </label>
                    <input
                        type="text"
                        id="recipient"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Enter recipient's user ID"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                        Amount (₹)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0.01"
                        step="0.01"
                        placeholder="Enter amount to transfer"
                        required
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading || !amount || !recipient}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : 'Transfer Funds'}
                    </button>
                </div>
            </form>
        </div>
    );
};