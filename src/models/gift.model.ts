import { Schema, model } from "mongoose";

type Category =
  | "All"
  | "Fashion"
  | "Tech"
  | "Sports"
  | "Accessories";

interface IGift {
  name: string;
  category: Category;
  store: string;
  image: string;
  reserved: boolean;
  productUrl: string;
  size: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  reservedBy?: {
    name: string;
    email: string;
  };
}

const giftSchema = new Schema<IGift>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  store: { type: String, required: true },
  image: { type: String, required: false },
  reserved: { type: Boolean, required: true, default: false },
  productUrl: { type: String, required: true },
  size: { type: String, required: false },
  reservedBy: {
    name: { type: String, required: false, default: null },
    email: { type: String, required: false, default: null },
  },
}, { timestamps: true });

export const GiftModel = model<IGift>("Gift", giftSchema);
