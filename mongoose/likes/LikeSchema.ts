import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

const LikeSchema = new mongoose.Schema<Like>({
    // We cannot directly refer to Tuit or User; must use ObjectId
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "likes"});
export default LikeSchema;