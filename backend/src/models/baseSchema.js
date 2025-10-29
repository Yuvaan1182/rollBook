/**
 * @Added on Oct 28, 2025
 * Creates a Mongoose schema with common configurations.
 * Automatically adds createdAt and updatedAt timestamps.
 * Transforms output to rename _id to id and optionally hide meta fields.
 * @example for usage:
 * const auditSchema = createBaseSchema(
    { message: String },
    {
        timestamps: true, // keep timestamps visible
        toObject: { transform: null }, // disable cleanup for this model
    });
    * const userSchema = createBaseSchema({ name: String }
 */

/* --------------------------------------------------------------------------------------------------------- */

/**
 * @param {Object} definition - Mongoose schema definition object.
 * @param {Object} options - Additional schema options.
 * @returns {mongoose.Schema} - Configured Mongoose schema.
 */

const mongoose = require("mongoose");

function createBaseSchema(definition, options = {}) {
  const schema = new mongoose.Schema(definition, {
    timestamps: true,
    ...options,
  });

  const transform = (_, ret, opts) => {
    // only hide when showMetaFields !== true
    if (!opts.showMetaFields) {
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    }

    // always rename _id → id
    if (ret._id) ret.id = ret._id;
    return ret;
  };

  schema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform,
  });

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform,
  });

  return schema;
}

module.exports = createBaseSchema;
