import e from "express";
import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema(
  {
    ownerPlantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    requesterPlantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",

      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled", "completed"],
      default: "pending",
    },
    meetingLocation: {
      type: String,
      default: null
    },
    rejectReason: {
      type: String,
      default: null
    },
    complationDate: {
      type: Date,
      default : null
    },
  },
  { timestamps: true },
);

const Trade = mongoose.model("Trade", tradeSchema);

export default  Trade
