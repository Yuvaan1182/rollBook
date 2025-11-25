export const mongooseTransform = (omitFields: string[] = []) => {
  return {
    virtuals: true, // include virtuals like "id"
    versionKey: false, // remove __v
    transform: (doc: any, ret: any) => {
      // Convert _id to id
      if (ret._id) {
        ret.id = ret._id.toString();
      }

      // Remove _id by default
      delete ret._id;

      // Omit custom fields
      omitFields.forEach((field) => {
        delete ret[field];
      });

      return ret;
    },
  };
};
