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
    //postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedBy: {type: String, ref: "UserModel"},
    // @ts-ignore
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0}
    }
}, {collection: 'tuits'});
export default TuitSchema;