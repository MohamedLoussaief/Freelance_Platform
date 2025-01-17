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
exports.getUserPortfolio = exports.deletePortfolio = exports.updatePortfolio = exports.createPortfolio = void 0;
const portfolio_1 = require("../services/portfolio");
const createPortfolio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { title, description, mediaUrl } = req.body;
        const portfolio = yield (0, portfolio_1.createPortfolioService)({
            title,
            description,
            mediaUrl,
            user: user._id,
        });
        res.status(201).json({
            status: "success",
            message: "Portfolio created successfully.",
            data: portfolio,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.createPortfolio = createPortfolio;
const updatePortfolio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { id } = req.params;
        const updates = req.body;
        const updatedPortfolio = yield (0, portfolio_1.updatePortfolioService)(id, user._id, updates);
        res.status(200).json({
            status: "success",
            message: "Portfolio updated successfully.",
            data: updatedPortfolio,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.updatePortfolio = updatePortfolio;
const deletePortfolio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { id } = req.params;
        const deletedPortfolio = yield (0, portfolio_1.deletePortfolioService)(id, user._id);
        res.status(200).json({
            status: "success",
            message: "Portfolio deleted successfully.",
            data: deletedPortfolio,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.deletePortfolio = deletePortfolio;
const getUserPortfolio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const portfolio = yield (0, portfolio_1.getUserPortfolioService)(user._id);
        res.status(200).json({
            status: "success",
            message: "User portfolios retrieved successfully.",
            data: portfolio,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getUserPortfolio = getUserPortfolio;
