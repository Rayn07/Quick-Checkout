"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const billController_1 = require("../controllers/billController");
const router = express_1.default.Router();
router.get('/generate-bill', billController_1.generateBill);
router.post('/send-bill', billController_1.sendBill);
exports.default = router;
//# sourceMappingURL=billRoutes.js.map