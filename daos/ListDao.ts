/**
 * @file Implements DAO managing data storage of lists. Uses mongoose ListModel
 * to integrate with MongoDB
 */
import ListDaoI from "../interfaces/ListDaoI";
import List from "../models/lists/List";
import ListModel from "../mongoose/lists/ListModel";

/**
 * @class ListDao implements a data access object that manages all users list data
 * @property {ListDao} listDao is a private instance of List DAO using the singleton pattern
 */
export default class ListDao implements ListDaoI {
    private static listDao: ListDao | null = null;
    /**
     * Creates a single instance of the ListDao
     * @returns ListDao
     */
    public static getInstance = (): ListDao => {
        if (ListDao.listDao === null) {
            ListDao.listDao = new ListDao();
        }
        return ListDao.listDao;
    }

    private constructor() {
    }

    /**
     * Calls on ListModel to retrieve all users in the list added by the logged in user
     * @param uid {string} logged in user id primary key
     */
    getAllUsersInList = async (uid:string): Promise<List[]> =>
        ListModel.find({addedBy:uid}).populate("addedUser").exec();

    /**
     * Calls on ListModel to remove a specific user from the user list
     * @param uid {string} logged in user id primary key
     * @param userId {string} user id of the user to be removed from the user list
     */
    removeUserFromList = async (uid: string, userId: string): Promise<any> =>
        ListModel.deleteOne({addedBy:uid , addedUser:userId});

    /**
     * Calls on ListModel to add a specific user from the user list
     * @param uid {string} logged in user id primary key
     * @param userId {string} user id of the user to be added to the user list
     */
    addUserToList = async (uid: string, userId: string): Promise<any> =>
        ListModel.create({addedBy:uid, addedUser:userId});

};

