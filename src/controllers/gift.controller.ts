import { Request, Response } from "express";
import { GiftModel } from "../models/gift.model";

export const getGifts = async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 9, 9);
    const search = (req.query.search as string)?.trim();
    const category = req.query.category as string;

    const filter: Record<string, any> = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          store: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category && category !== "All") {
      filter.category = category;
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      GiftModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      GiftModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch gifts.",
    });
  }
};

export const createGift = async (req: Request, res: Response) => {
  const gift = await GiftModel.create(req.body);

  return res.status(201).json({ message: "Gift created successfully", gift });
};

export const reserveGift = async (req: Request, res: Response) => {

  const { id } = req.params;
  const { email, name } = req.body;
  const gift = await GiftModel.findByIdAndUpdate(
    id,
    { reserved: true, reservedBy: { email, name }, updatedAt: new Date() }
  );

  return res.status(200).json({ message: "Gift reserved successfully", gift });
};