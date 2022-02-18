/**
 * @file Implements mongoose schema for tuits
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} tuit represents the content of the tuit
 * @property {Date} postedOn represents when the tuit was posted
 * @property {ObjectId} postedBy represents the user who posted the tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now()},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: 'tuits'});
export default TuitSchema;