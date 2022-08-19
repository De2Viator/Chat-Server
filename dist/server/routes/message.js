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
exports.routerMessages = void 0;
const express_1 = __importDefault(require("express"));
const Message_1 = require("../../db/schemas/Message");
exports.routerMessages = express_1.default.Router();
exports.routerMessages
    .get("/:chatId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield Message_1.Message.find({ chatId: req.params.chatId });
    res.status(200).send(messages);
}))
    .post("/:chatId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addedMessage = yield Message_1.Message.create({
        name: req.body.name,
        message: req.body.message,
        chatId: req.params.chatId,
    });
    res.send(addedMessage);
}))
    .put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedMessage = yield Message_1.Message.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        message: req.body.message,
    });
    res.status(200).send(updatedMessage);
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedMessage = yield Message_1.Message.findByIdAndDelete(req.params.id);
    res.send(deletedMessage);
}));
