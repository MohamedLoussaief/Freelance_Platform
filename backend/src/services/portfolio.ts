import Portfolio, { IPortfolio } from "../models/portfolio";
import { Types } from "mongoose";
import CustomError from "../utils/CustomError";

interface PortfolioInput {
  user?: Types.ObjectId;
  title?: string;
  description?: string;
  mediaUrl?: string;
}

const createPortfolioService = async (data: PortfolioInput) => {
  const portfolio = new Portfolio(data);
  return await portfolio.save();
};

const updatePortfolioService = async (
  portfolioId: string,
  userId: Types.ObjectId,
  updates: PortfolioInput
) => {
  const portfolio = await Portfolio.findOneAndUpdate(
    { _id: portfolioId, user: userId },
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!portfolio) {
    throw new CustomError("Portfolio not found", 400);
  }

  return portfolio;
};

const deletePortfolioService = async (
  portfolioId: string,
  userId: Types.ObjectId
) => {
  const portfolio = await Portfolio.findOneAndDelete({
    _id: portfolioId,
    user: userId,
  });

  if (!portfolio) {
    throw new CustomError("Portfolio not found", 400);
  }

  return portfolio;
};

const getUserPortfolioService = async (userId: Types.ObjectId) => {
  const portfolio = await Portfolio.find({ user: userId }).sort({
    createdAt: -1,
  });
  return portfolio;
};

export {
  createPortfolioService,
  updatePortfolioService,
  deletePortfolioService,
  getUserPortfolioService,
};
