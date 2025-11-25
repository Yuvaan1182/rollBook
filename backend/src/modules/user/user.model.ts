import { Schema, model } from "mongoose";
import { mongooseTransform } from "../../core/db/transform.db";

const UserSchema = new Schema(
  {
    // Basic user information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      unique: true,
      index: true,
    },

    // Business info (Invoxy user profile)
    companyName: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    gstNumber: {
      type: String,
      default: null,
    },

    // Business blocking (admin / fraud)
    isBlocked: {
      type: Boolean,
      default: false,
    },

    // User onboarding flow
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },

    // Meta info
    lastActiveAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", mongooseTransform());
UserSchema.set("toObject", mongooseTransform());

export const UserModel = model("User", UserSchema);
