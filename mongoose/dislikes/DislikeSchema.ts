/**
 * @file Implements mongoose schema for users disliking tuits
 */
import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

/**
 * @typedef Dislike Represents a tuit disliked by a user
 * @property {ObjectId} tuit represents the tuit that is disliked
 * @property {ObjectId} dislikedBY represents the user that disliked the tuit
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: String, ref: "UserModel"}
}, {collection: "dislikes"});
export default DislikeSchema;