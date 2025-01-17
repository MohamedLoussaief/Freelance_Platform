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
exports.getUserPortfolioService = exports.deletePortfolioService = exports.updatePortfolioService = exports.createPortfolioService = void 0;
const portfolio_1 = __importDefault(require("../models/portfolio"));
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const createPortfolioService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = new portfolio_1.default(data);
    return yield portfolio.save();
});
exports.createPortfolioService = createPortfolioService;
const updatePortfolioService = (portfolioId, userId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield portfolio_1.default.findOneAndUpdate({ _id: portfolioId, user: userId }, { $set: updates }, { new: true, runValidators: true });
    if (!portfolio) {
        throw new CustomError_1.default("Portfolio not found", 400);
    }
    return portfolio;
});
exports.updatePortfolioService = updatePortfolioService;
const deletePortfolioService = (portfolioId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield portfolio_1.default.findOneAndDelete({
        _id: portfolioId,
        user: userId,
    });
    if (!portfolio) {
        throw new CustomError_1.default("Portfolio not found", 400);
    }
    return portfolio;
});
exports.deletePortfolioService = deletePortfolioService;
const getUserPortfolioService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolio = yield portfolio_1.default.find({ user: userId }).sort({
        createdAt: -1,
    });
    return portfolio;
});
exports.getUserPortfolioService = getUserPortfolioService;
