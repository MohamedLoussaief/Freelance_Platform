"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Connect to db
mongoose_1.default
    .connect(process.env.DB_URL)
    .then(() => {
    console.log("Connected to the database succefully");
})
    .catch((error) => {
    console.log("error with connecting", error);
});
// Server listening
app.listen(9090, () => {
    console.log(`I'm listening in port 9090`);
});
