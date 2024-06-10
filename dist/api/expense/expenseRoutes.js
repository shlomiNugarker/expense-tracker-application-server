"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenseController_1 = __importDefault(require("./expenseController"));
const jwtService_1 = require("../../services/jwtService");
const router = express_1.default.Router();
const { validateToken } = jwtService_1.jwtService;
router.get('/', validateToken, expenseController_1.default.getExpenses);
router.get('/:id', validateToken, expenseController_1.default.getExpenseById);
router.put('/:id', validateToken, expenseController_1.default.updateExpense);
router.post('/', validateToken, expenseController_1.default.addExpense);
router.delete('/:id', validateToken, expenseController_1.default.removeExpense);
exports.default = router;
