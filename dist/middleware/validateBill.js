"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateItems = void 0;
const validateItems = (items) => {
    if (!Array.isArray(items)) {
        return { valid: false, message: 'Items must be an array' };
    }
    if (items.length > 3) {
        return { valid: false, message: 'Maximum of 3 products allowed' };
    }
    if (items.length === 0) {
        return { valid: false, message: 'At least one product is required' };
    }
    return { valid: true, message: 'Valid' };
};
exports.validateItems = validateItems;
//# sourceMappingURL=validateBill.js.map