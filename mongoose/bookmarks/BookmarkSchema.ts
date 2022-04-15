/**
 * @file Implements mongoose schema for bookmarked tuits
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @typedef Bookmark Represents a tuit bookmarked by a user
 * @property {ObjectId} tuit represents the bookmarked tuit
 * @proprety {ObjectId} bookmarkedBy represents the user that bookmarked the tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: String, ref: "UserModel"}
}, {collection: "bookmarks"});
export default BookmarkSchema;