"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotal = exports.funcBillGenerator = void 0;
const funcBillGenerator = (length = 9) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let billnum = '';
    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * chars.length);
        billnum += chars[random];
    }
    return billnum;
};
exports.funcBillGenerator = funcBillGenerator;
const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
};
exports.calculateTotal = calculateTotal;
//# sourceMappingURL=billGenerator.js.map