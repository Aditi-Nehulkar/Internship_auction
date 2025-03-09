import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  basePrice: { type: Number, required: true },
  currentBid: { type: Number, default: null },
  timeLimit: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Auction", auctionSchema);
