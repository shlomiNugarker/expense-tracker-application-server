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
const itemService_1 = __importDefault(require("./itemService"));
exports.default = { getItemById, updateItem, addItem };
function getItemById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const item = yield itemService_1.default.getById(id);
            res.json(item);
        }
        catch (err) {
            console.error(err);
            res.status(401).send({ err: 'Failed to get Item By Id' });
        }
    });
}
function updateItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const item = req.body;
            const addeditem = yield itemService_1.default.update(item);
            res.json(addeditem);
        }
        catch (err) {
            console.error(err);
            res.status(401).send({ err: 'Failed to update item' });
        }
    });
}
function addItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const item = req.body;
            const addeditem = yield itemService_1.default.add(item);
            res.json(addeditem);
        }
        catch (err) {
            console.error(err);
            res.status(401).send({ err: 'Failed to add item' });
        }
    });
}
