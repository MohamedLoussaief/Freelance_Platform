"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const portfolio_1 = __importDefault(require("./routes/portfolio"));
const project_1 = __importDefault(require("./routes/project"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./middlewares/errorHandler");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: process.env.CLIENT, credentials: true }));
// routes
app.use("/auth", auth_1.default);
app.use("/profile", user_1.default);
app.use("/portfolio", portfolio_1.default);
app.use("/project", project_1.default);
// error handler middleware
app.use(errorHandler_1.errorHandler);
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
app.listen(process.env.PORT, () => {
    console.log(`I'm listening in port 9090`);
});
