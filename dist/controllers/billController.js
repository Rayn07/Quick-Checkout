"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBill = exports.generateBill = void 0;
const validateBill_1 = require("../middleware/validateBill");
const billGenerator_1 = require("../utils/billGenerator");
const emailService_1 = require("../services/emailService");
const generateBill = (req, res) => {
    const billData = {
        billNumber: req.app.locals.billNumber,
        date: new Date().toLocaleDateString(),
        customerName: 'Aarya Upadhya',
        items: [
            { description: 'Product 1', quantity: 2, price: 156 },
            { description: 'Product 2', quantity: 1, price: 225 },
            { description: 'Product 3', quantity: 1, price: 125 },
        ],
    };
    const validation = (0, validateBill_1.validateItems)(billData.items);
    if (!validation.valid) {
        res.status(400).send(validation.message);
        return;
    }
    const totalAmount = (0, billGenerator_1.calculateTotal)(billData.items);
    billData.total = totalAmount;
    res.render('bill', { bill: billData });
};
exports.generateBill = generateBill;
const sendBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, billData: billDataString } = req.body;
    if (!email || !billDataString) {
        res.status(400).send('Email and bill data are required');
        return;
    }
    try {
        const billDetails = JSON.parse(billDataString);
        const validation = (0, validateBill_1.validateItems)(billDetails.items);
        if (!validation.valid) {
            res.status(400).send(validation.message);
            return;
        }
        billDetails.total = (0, billGenerator_1.calculateTotal)(billDetails.items);
        yield (0, emailService_1.sendBillEmail)(email, billDetails);
        res.status(200).send('Bill sent successfully');
    }
    catch (error) {
        console.error('Error processing bill data:', error);
        res.status(500).send('Failed to process or send bill');
    }
});
exports.sendBill = sendBill;
//# sourceMappingURL=billController.js.map