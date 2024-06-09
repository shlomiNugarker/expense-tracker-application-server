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
const userService_1 = __importDefault(require("./userService"));
exports.default = {
    getUserByEmail,
    updateUser,
    addUser,
};
function getUserByEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userService_1.default.getByEmail(req.params.email);
            res.send(user);
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ err: 'Failed to get user' });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const savedUser = yield userService_1.default.update(user);
            res.send(savedUser);
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ err: 'Failed to update user' });
        }
    });
}
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const savedUser = yield userService_1.default.add(user);
            res.send(savedUser);
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ err: 'Failed to update user' });
        }
    });
}
