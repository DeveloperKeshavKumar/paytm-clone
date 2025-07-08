const Transaction = require('../models/transaction.model.js');
const User = require('../models/user.model.js');
const zod = require('zod');

const GetTransactionHistoryQuery = zod.object({
    page: zod.string().optional().default('1'),
    limit: zod.string().optional().default('10'),
    type: zod.enum(['sent', 'received', 'all']).optional().default('all')
});

module.exports.getTransactionHistory = async (req, res, next) => {
    try {
        const result = GetTransactionHistoryQuery.safeParse(req.query);
        if (!result.success) {
            return res.status(400).json({ message: "Invalid query parameters" });
        }

        const { page, limit, type } = result.data;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        let query = {};

        // Filter based on transaction type
        if (type === 'sent') {
            query.senderId = req.userId;
        } else if (type === 'received') {
            query.receiverId = req.userId;
        } else {
            // For 'all', get both sent and received
            query.$or = [
                { senderId: req.userId },
                { receiverId: req.userId }
            ];
        }

        // Get transactions with user details
        const transactions = await Transaction.find(query)
            .populate('senderId', 'name email')
            .populate('receiverId', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        // Get total count for pagination
        const totalCount = await Transaction.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limitNum);

        // Format transactions for frontend
        const formattedTransactions = transactions.map(transaction => ({
            id: transaction._id,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            type: transaction.senderId._id.toString() === req.userId ? 'sent' : 'received',
            sender: {
                id: transaction.senderId._id,
                name: transaction.senderId.name,
                email: transaction.senderId.email
            },
            receiver: {
                id: transaction.receiverId._id,
                name: transaction.receiverId.name,
                email: transaction.receiverId.email
            }
        }));

        return res.status(200).json({
            message: "Transaction history fetched successfully",
            transactions: formattedTransactions,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalCount,
                hasNextPage: pageNum < totalPages,
                hasPreviousPage: pageNum > 1
            }
        });

    } catch (error) {
        next(error);
    }
};

module.exports.getTransactionById = async (req, res, next) => {
    try {
        const { transactionId } = req.params;

        const transaction = await Transaction.findById(transactionId)
            .populate('senderId', 'name email')
            .populate('receiverId', 'name email');

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        // Check if user has permission to view this transaction
        const userId = req.userId;
        if (transaction.senderId._id.toString() !== userId &&
            transaction.receiverId._id.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to view this transaction" });
        }

        const formattedTransaction = {
            id: transaction._id,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            type: transaction.senderId._id.toString() === userId ? 'sent' : 'received',
            sender: {
                id: transaction.senderId._id,
                name: transaction.senderId.name,
                email: transaction.senderId.email
            },
            receiver: {
                id: transaction.receiverId._id,
                name: transaction.receiverId.name,
                email: transaction.receiverId.email
            }
        };

        return res.status(200).json({
            message: "Transaction details fetched successfully",
            transaction: formattedTransaction
        });

    } catch (error) {
        next(error);
    }
};