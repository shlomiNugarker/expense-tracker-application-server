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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expenseService_1 = __importDefault(require("./expenseService"));
exports.default = {
    getExpenses,
    getExpenseById,
    updateExpense,
    addExpense,
    removeExpense,
};
function getExpenses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const expenses = yield expenseService_1.default.getExpenses(userId);
            res.json(expenses);
        }
        catch (err) {
            console.error(err);
            res.status(401).send({ err: 'Failed to get Expenses' });
        }
    });
}
function getExpenseById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const expense = yield expenseService_1.default.getById(id);
            res.json(expense);
        }
        catch (err) {
            console.error(err);
            res.status(401).send({ err: 'Failed to get expense By Id' });
        }
    });
}
function updateExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const expense = req.body;
            const addeditem = yield expenseService_1.default.update(expense);
            res.json(addeditem);
        }
        catch (err) {
            console.error(err);
            res.status(401).send({ err: 'Failed to update expense' });
        }
    });
}
function addExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('addd');
            const expense = req.body;
            const addeditem = yield expenseService_1.default.add(expense);
            res.json(addeditem);
        }
        catch (err) {
            console.error(err);
            res.status(401).send({ err: 'Failed to add expense' });
        }
    });
}
function removeExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedId = yield expenseService_1.default.remove(id);
            if (deletedId) {
                res.status(200).json({ _id: deletedId });
            }
            else {
                res.status(404).json({ error: 'Expense not found' });
            }
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to delete expense' });
        }
    });
}
