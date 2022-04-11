/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from '../models/tuits/Tuit';
import TuitModel from '../mongoose/tuits/TuitModel';
import TuitDaoI from '../interfaces/TuitDaoI';

/**
 * @class TuitDao implements a data access object that manages all tuit data
 * @property {TuitDao} tuitDao is a private instance of Tuit DAO using the singleton pattern
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    /**
     * Creates a single instance of the TuitDao
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}
    /**
     * Calls on TuitModel to retrieve all tuits
     */
    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find().populate("postedBy");
    }
    /**
     * Calls on TuitModel to retrieve all tuits posted by a user
     * @param uid {string} user primary key
     */
    async findAllTuitsByUser(uid: string): Promise<Tuit[]> {
        return TuitModel.find({postedBy: uid}).populate("postedBy");
    }
    /**
     * Calls on TuitModel to retrieve a specific tuit
     * @param tid {string} tuit primary key
     */
    async findTuitById(tid: string): Promise<any> {
        return TuitModel.findById(tid).populate("postedBy");
    }
    /**
     * Calls on TuitModel to create a new instance of a tuit posted by a user
     * @param uid {string} user primary key
     * @param tuit {string} tuit content
     */
    async createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create({...tuit, postedBy: uid});
    }
    /**
     * Calls on TuitModel to delete an instance of a tuit
     * @param tid {string} tuit primary key
     */
    async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({_id: tid});
    }
    /**
     * Calls on TuitModel to update an existing tuit with a new tuit object
     * @param tid {string} tuit primary key
     * @param tuit {Tuit} tuit to replace the exiting tuit
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }
    // For testing purposes
    async deleteTuitByAuthor(uid: String): Promise<any> {
        return TuitModel.deleteMany({postedBy: uid});
    }

    // For testing purposes - the content must be a string with no spaces
    async deleteTuitByContent(tuitContent: string): Promise<any> {
        return TuitModel.deleteMany({tuit: tuitContent});
    }

    async updateLikes(tid: string, newStats: any): Promise<any> {
        return TuitModel.updateOne({_id: tid}, {$set: {stats: newStats}});
    }
}