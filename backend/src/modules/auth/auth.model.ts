import { Schema, model } from "mongoose";
import { mongooseTransform } from "../../core/db/transform.db";

const AuthSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // For JWT Refresh token system
    refreshTokens: {
      type: [String],
      default: [],
    },

    // For upcoming 2FA (Google Authenticator)
    twoFAEnabled: {
      type: Boolean,
      default: false,
    },
    twoFASecret: {
      type: String,
      default: null,
    },

    // Track login metadata — useful for audit logs
    lastLoginAt: {
      type: Date,
      default: null,
    },

    // Device identification (future feature)
    devices: [
      {
        deviceId: String,
        deviceName: String,
        lastUsedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

AuthSchema.set("toJSON", mongooseTransform());
AuthSchema.set("toObject", mongooseTransform());

export const AuthModel = model("Auth", AuthSchema);
