"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itemController_1 = __importDefault(require("./itemController"));
const router = express_1.default.Router();
router.get('/:id', itemController_1.default.getItemById);
router.put('/:id', itemController_1.default.updateItem);
router.post('/', itemController_1.default.addItem);
exports.default = router;
