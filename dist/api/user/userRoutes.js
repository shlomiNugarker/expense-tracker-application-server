"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("./userController"));
const router = express_1.default.Router();
router.get('/:email', userController_1.default.getUserByEmail);
router.put('/:id', userController_1.default.updateUser);
router.post('/', userController_1.default.addUser);
exports.default = router;
