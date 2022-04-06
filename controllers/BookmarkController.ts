/**
 * @file Controller RESTful web service API for bookmarks resource
 */
import {Request, Response, Express} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
 * @class BookmarkController Implements RESTful web service API for bookmarks resource
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/bookmarks to retrieve all tuits bookmarked by a user</li>
 *     <li>GET /tuits/:tid/bookmarks to retrieve all users that bookmarked a tuit</li>
 *     <li>POST /users/:uid/bookmarks/:tid to record that a user bookmarked a tuit</li>
 *     <li>DELETE /users/:uid/bookmarks/:tid to record that a user no longer bookmarks a tuit</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing RESTful web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
    /**
     * Create a single instance of the bookmark controller
     * @param {Express} app Express instance to declare the RESTful web service API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.get('/api/users/:uid/bookmarks', BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.get('/api/tuits/:tid/bookmarks', BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
            app.post('/api/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete('/api/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userUnbookmarksTuit);
        }
        return BookmarkController.bookmarkController;
    }
    private constructor(){}

    /**
     * Retrieves all tuits bookmarked by a user from the database
     * @param {Request} req The request from the client, including the path parameter uid representing the user
     * who has bookmarked tuits
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant tuit objects
     */
    findAllTuitsBookmarkedByUser(req: Request, res: Response) {
        return BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));
    }

    /**
     * Retrieves all users that bookmarked a tuit from the database
     * @param {Request} req The request from the client, including the path parameter tid representing the tuit
     * that has been bookmarked
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant user objects
     */
    findAllUsersThatBookmarkedTuit(req: Request, res: Response) {
        return BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.json(bookmarks));
    }
    /**
     * Creates a bookmark instance in the database
     * @param {Request} req The request from the client, including the path parameters uid and tid representing
     * the user bookmarking the tuit and the tuit being bookmarked
     * @param {Response} res The response to the client, including the body as a JSON object containing
     * the new bookmark
     */
    userBookmarksTuit(req: Request, res: Response) {
        return BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmark => res.json(bookmark));
    }
    /**
     * Deletes a bookmark instance in the database
     * @param {Request} req The request from the client, including the path parameters uid and tid representing
     * the user unbookmarking the tuit and the tuit being unbookmarked
     * @param {Response} res The response to the client, including status on whether deleting the bookmark
     * was successful or not
     */
    userUnbookmarksTuit(req: Request, res: Response) {
        return BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
    }
}