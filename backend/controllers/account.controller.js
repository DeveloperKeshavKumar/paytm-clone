const Account = require('../models/account.model.js');
const zod = require('zod');

module.exports.getBalance = async (req, res, next) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        return res.status(200).json({ message: "Balance fetched resfully", balance: account.balance });
    } catch (error) {
        next(error);
    }
}

const TransferFundBody = zod.object({
    amountToTransfer: zod.number(),
    receiverId: zod.string()
});

module.exports.transferFund = async (req, res, next) => {
    try {

        const result = TransferFundBody.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ message: "Invalid inputs" });
        }

        const { amountToTransfer, receiverId } = req.body;

        const receiverAccount = await Account.findOne({ userId: receiverId });
        if (!receiverAccount) {
            return res.status(400).json({ message: "Invalid account" });
        }

        const senderAccount = await Account.findOne({ userId: req.userId });
        if (senderAccount.balance < amountToTransfer) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const senderUpdate = await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amountToTransfer } }
        );

        const receiverUpdate = await Account.updateOne(
            { userId: receiverId },
            { $inc: { balance: amountToTransfer } }
        );

        if (senderUpdate.modifiedCount === 0 || receiverUpdate.modifiedCount === 0) {
            return res.status(400).json({ message: "Transaction failed" });
        }

        const updatedSenderAccount = await Account.findOne({ userId: req.userId });

        return res.status(200).json({
            message: "Transaction done successfully",
            balance: updatedSenderAccount.balance
        });

    } catch (error) {
        next(error);
    }
}