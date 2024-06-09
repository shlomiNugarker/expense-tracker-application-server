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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const httpService_1 = require("./httpService");
exports.userService = {
    getUserById,
    saveUser,
};
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield httpService_1.httpService.get('user/' + userId);
        return user;
    });
}
function saveUser(userToSave) {
    return __awaiter(this, void 0, void 0, function* () {
        const savedUser = userToSave._id
            ? yield httpService_1.httpService.put(`user/` + userToSave._id, userToSave)
            : yield httpService_1.httpService.post(`user`, userToSave);
        return savedUser;
    });
}
