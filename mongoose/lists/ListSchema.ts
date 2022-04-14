import mongoose, {Schema} from "mongoose";
import List from "../../models/lists/List";

/**
 * @typedef ListSchema Represents a list added by user to the database
 * @property {ObjectId} addedBy represents the logged in user
 * @proprety {ObjectId} addedUser represents the user added by the logged in user.
 */
const ListSchema = new mongoose.Schema<List>({
    addedBy : {type: String, ref: "UserModel"},
    addedUser : {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "lists"});

export default ListSchema;