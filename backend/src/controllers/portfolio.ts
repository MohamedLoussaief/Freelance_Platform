import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import {
  createPortfolioService,
  deletePortfolioService,
  getUserPortfolioService,
  updatePortfolioService,
} from "../services/portfolio";

const createPortfolio = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { title, description, mediaUrl } = req.body;

    const portfolio = await createPortfolioService({
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
  } catch (error: any) {
    next(error);
  }
};

const updatePortfolio = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const updates = req.body;

    const updatedPortfolio = await updatePortfolioService(
      id,
      user._id,
      updates
    );

    res.status(200).json({
      status: "success",
      message: "Portfolio updated successfully.",
      data: updatedPortfolio,
    });
    return;
  } catch (error) {
    next(error);
  }
};

const deletePortfolio = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const deletedPortfolio = await deletePortfolioService(id, user._id);

    res.status(200).json({
      status: "success",
      message: "Portfolio deleted successfully.",
      data: deletedPortfolio,
    });
    return;
  } catch (error) {
    next(error);
  }
};

const getUserPortfolio = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const portfolio = await getUserPortfolioService(user._id);

    res.status(200).json({
      status: "success",
      message: "User portfolios retrieved successfully.",
      data: portfolio,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export { createPortfolio, updatePortfolio, deletePortfolio, getUserPortfolio };
