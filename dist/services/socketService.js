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
exports.default = {
    connectSockets,
};
let gIo;
function connectSockets(http, _session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
            pingTimeout: 60000,
        },
    });
    gIo.on('connection', (socket) => {
        console.log('socket connected, id: ' + socket.id);
        socket.on('login', (userId) => __awaiter(this, void 0, void 0, function* () {
            // console.log('user logged in: ' + userId)
            socket.userId = userId;
        }));
        // when browser disconnected
        socket.on('disconnect', () => __awaiter(this, void 0, void 0, function* () {
            console.log('socket disconnected, id: ' + socket.id);
        }));
    });
}
function emitToSocket({ type, data, socketId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const socket = yield getSocketById(socketId);
        if (socket)
            socket.emit(type, data);
        else {
            console.log('socket not found');
        }
    });
}
function getSocketById(socketId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sockets = yield getAllSockets();
        if (!sockets)
            return;
        const socket = sockets.find((s) => s.id === socketId);
        return socket;
    });
}
function getAllSockets() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!gIo)
            return;
        const sockets = yield gIo.fetchSockets();
        return sockets;
    });
}
function getAllSocketsIds() {
    return __awaiter(this, void 0, void 0, function* () {
        const sockets = yield gIo.fetchSockets();
        const socketsIds = [];
        sockets.forEach((socket) => {
            socketsIds.push(socket.id);
        });
        return socketsIds;
    });
}
