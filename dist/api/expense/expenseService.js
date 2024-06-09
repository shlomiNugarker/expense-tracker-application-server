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
const mongodb_1 = require("mongodb");
const dbService_1 = __importDefault(require("../../services/dbService"));
exports.default = {
    getById,
    add,
    update,
    remove,
    getExpenses,
};
const COLLECTION_NAME = 'expense';
function getExpenses(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService_1.default.getCollection(COLLECTION_NAME);
            const expenses = collection.find({ userId }).toArray();
            return expenses;
        }
        catch (err) {
            throw err;
        }
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService_1.default.getCollection(COLLECTION_NAME);
            const expense = collection.findOne({ _id: new mongodb_1.ObjectId(id) });
            return expense;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
function add(expense) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService_1.default.getCollection(COLLECTION_NAME);
            yield collection.insertOne(expense);
            return expense;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
function update(expense) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var id = new mongodb_1.ObjectId(expense._id);
            delete expense._id;
            const collection = yield dbService_1.default.getCollection(COLLECTION_NAME);
            yield collection.updateOne({ _id: id }, { $set: Object.assign({}, expense) });
            const addedExpense = Object.assign(Object.assign({}, expense), { _id: id });
            return addedExpense;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService_1.default.getCollection(COLLECTION_NAME);
            yield collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return id;
        }
        catch (err) {
            throw err;
        }
    });
}
