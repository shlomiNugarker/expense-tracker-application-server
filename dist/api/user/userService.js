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
const dbService_1 = __importDefault(require("../../services/dbService"));
const ObjectId = require('mongodb').ObjectId;
exports.default = {
    getByEmail,
    update,
    add,
};
const COLLECTION_NAME = 'user';
function getByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService_1.default.getCollection(COLLECTION_NAME);
            const user = yield collection.findOne({ email });
            return user;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
function update(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userToSave = Object.assign(Object.assign({}, user), { _id: ObjectId(user._id) });
            const collection = yield dbService_1.default.getCollection(COLLECTION_NAME);
            yield collection.updateOne({ _id: userToSave._id }, { $set: userToSave });
            return userToSave;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
function add(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService_1.default.getCollection(COLLECTION_NAME);
            yield collection.insertOne(user);
            return user;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
