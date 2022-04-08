/**
 * @file Implements mongoose schema for users liking tuits
 */
import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @typedef Like Represents a tuit liked by a user
 * @property {ObjectId} tuit represents the liked tuit
 * @proprety {ObjectId} likedBy represents the user that liked the tuit
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    // change this to any to avoid errors
    likedBy: {type: String, ref: "UserModel"}
}, {collection: "likes"});
export default LikeSchema;