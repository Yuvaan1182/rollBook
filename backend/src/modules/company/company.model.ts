import { model, Schema } from "mongoose";
import { mongooseTransform } from "../../core/db/transform.db";

const CompanySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    companyName: { type: String, required: true },
    address: { type: String, default: null },
    country: { type: String, default: null },
    gstNumber: { type: String, default: null },

    // Branding / Preferences (future) helps in creating invoice pdf view
    logoUrl: { type: String, default: null },
    defaultCurrency: { type: String, default: "INR" },
    invoicePrefix: { type: String, default: "INV" },
    themeColor: { type: String, default: "#000000" },
  },
  { timestamps: true }
);

CompanySchema.set("toJSON", mongooseTransform());
CompanySchema.set("toObject", mongooseTransform());

export const UserModel = model("User", CompanySchema);
