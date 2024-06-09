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
};
const COLLECTION_NAME = 'item';
function getById(itemId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService_1.default.getCollection(COLLECTION_NAME);
            const item = collection.findOne({ _id: new mongodb_1.ObjectId(itemId) });
            return item;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
function add(item) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stateToAdd = Object.assign(Object.assign({}, item), { createdAt: new Date().getTime() });
            const collection = yield dbService_1.default.getCollection(COLLECTION_NAME);
            yield collection.insertOne(stateToAdd);
            return stateToAdd;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
function update(item) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var id = new mongodb_1.ObjectId(item._id);
            delete item._id;
            const collection = yield dbService_1.default.getCollection(COLLECTION_NAME);
            yield collection.updateOne({ _id: id }, { $set: Object.assign({}, item) });
            const addedItem = Object.assign(Object.assign({}, item), { _id: id });
            return addedItem;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
