/**
 * @file Implements a DAO that manages all bookmark related data
 */
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

/**
 * @class BookmarkDao implements a data access object that manages all bookmark data
 * @property {BookmarkDao} bookmarkDao is a private instance of Bookmark DAO using the singleton pattern
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates a single instance of the BookmarkDao
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {
    };
    /**
     * Calls on BookmarkModel to retrieve all tuits bookmarked by single user,
     * and populates the tuit references
     * @param uid {string} user primary key
     */
    findAllTuitsBookmarkedByUser = (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({ bookmarkedBy: uid }).populate("tuit").exec();

    /**
     * Calls on BookmarkModel to retrieve all users that have bookmarked a specific tuit,
     * and populates the user references
     * @param tid {string} tuit primary key
     */
    findAllUsersThatBookmarkedTuit = (tid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({ tuit: tid }).populate("bookmarkedBy").exec();

    /**
     * Calls on BookmarkModel to create a new Bookmark instance
     * @param uid {string} user primary key
     * @param tid {string} tuit primary key
     */
    userBookmarksTuit = (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({ tuit: tid, bookmarkedBy: uid });

    /**
     * Calls on BookmarkModel to delete an existing instance of Bookmark
     * @param uid {string} user primary key
     * @param tid {string} tuit primary key
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({ tuit: tid, bookmarkedBy: uid });

    findUserBookmarkedTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.findOne({ tuit: tid, bookmarkedBy: uid });

    deleteAllBookmarksOfTuit = async (tid: string): Promise<any> =>
        BookmarkModel.deleteMany({ tuit: tid });
}
