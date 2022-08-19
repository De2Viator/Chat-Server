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
exports.routerChat = void 0;
const Chat_1 = require(".././../db/schemas/Chat");
const express_1 = __importDefault(require("express"));
exports.routerChat = express_1.default.Router();
exports.routerChat
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield Chat_1.Chat.find();
    res.status(200).send(chats);
}))
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const create = yield Chat_1.Chat.create({
        name: req.body.name,
    });
    res.status(201).send(create);
}))
    .put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield Chat_1.Chat.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    });
    res.status(200).send(updated);
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield Chat_1.Chat.findByIdAndDelete(req.params.id);
    res.status(204).send(deleted);
}));
