import List from "../models/lists/List";

export default interface ListDaoI {
    getAllUsersInList(uid : string) : Promise<List[]>;
    removeUserFromList(uid : string, userId : string) : Promise<any>;
    addUserToList(uid : string, userId : string) : Promise<any>;
}