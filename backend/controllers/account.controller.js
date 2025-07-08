const Account = require('../models/account.model.js');
const Transaction = require('../models/transaction.model.js');
const mongoose = require('mongoose');
const zod = require('zod');

module.exports.getBalance = async (req, res, next) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        return res.status(200).json({ message: "Balance fetched successfully", balance: account.balance });
    } catch (error) {
        next(error);
    }
}

const TransferFundBody = zod.object({
    amountToTransfer: zod.number(),
    receiverId: zod.string()
});

module.exports.transferFund = async (req, res, next) => {
    
    const session = await mongoose.startSession();

    try {

        const result = TransferFundBody.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ message: "Invalid inputs" });
        }

        const { amountToTransfer, receiverId } = req.body;

        if (receiverId === req.userId) {
            return res.status(400).json({ message: "Cannot transfer to self" });
        }

        session.startTransaction();

        const receiverAccount = await Account.findOne({ userId: receiverId }).session(session);
        if (!receiverAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid receiver account" });
        }

        const senderAccount = await Account.findOne({ userId: req.userId }).session(session);
        if (!senderAccount || senderAccount.balance < amountToTransfer) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const senderUpdate = await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amountToTransfer } }
        ).session(session);

        const receiverUpdate = await Account.updateOne(
            { userId: receiverId },
            { $inc: { balance: amountToTransfer } }
        ).session(session);

        if (senderUpdate.modifiedCount === 0 || receiverUpdate.modifiedCount === 0) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Transaction failed" });
        }

        // Create transaction record
        const transaction = new Transaction({
            senderId: req.userId,
            receiverId: receiverId,
            amount: amountToTransfer,
            status: 'completed'
        });

        await transaction.save({ session });

        await session.commitTransaction();
        const updatedSenderAccount = await Account.findOne({ userId: req.userId });

        return res.status(200).json({
            message: "Transaction done successfully",
            balance: updatedSenderAccount.balance,
            transactionId: transaction._id
        });

    } catch (error) {
        await session.abortTransaction();
        next(error);
    }
    finally {
        session.endSession();
    }
}