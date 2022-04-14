/**
 * @file Implements mongoose model to CRUD documents in the lists collection
 */
import mongoose from "mongoose";
import ListSchema from "./ListSchema";

const ListModel = mongoose.model('ListModel', ListSchema);
export default ListModel;