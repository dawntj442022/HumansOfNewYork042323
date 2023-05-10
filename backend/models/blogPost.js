const { Schema, model } = require("mongoose");

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [], // Apply default value here
    },
    dislikes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [], // Apply default value here
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("BlogPost", blogPostSchema);
