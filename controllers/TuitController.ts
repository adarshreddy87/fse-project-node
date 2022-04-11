/**
 * @file Controller RESTful web service API for tuits resource
 */
import {Request, Response, Express} from "express";
import TuitDao from '../daos/TuitDao';
import TuitControllerI from '../interfaces/TuitControllerI';
import Tuit from "../models/tuits/Tuit";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /tuits to retrieve all the tuit instances</li>
 *     <li>GET /tuits/:tid to retrieve a particular tuit instance</li>
 *     <li>GET /users/:uid/tuits to retrieve tuits for a given user </li>
 *     <li>POST /users/:uid/tuits to create a new tuit instance for a given user</li>
 *     <li>PUT /tuits/:tid to modify an individual tuit instance </li>
 *     <li>DELETE /tuits/:tid to remove a particular tuit instance</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing RESTful Web service API
 */
export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    /**
     * Create a single instance of the tuit controller
     * @param {Express} app Express instance to declare the RESTful web service API
     * @return TuitController
     */
    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get('/api/tuits', TuitController.tuitController.findAllTuits);
            app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
            app.get('/api/users/:uid/tuits', TuitController.tuitController.findAllTuitsByUser);
            app.post('/api/users/:uid/tuits', TuitController.tuitController.createTuitByUser);
            app.delete('/api/tuits/:tid', TuitController.tuitController.deleteTuit);
            app.put('/api/tuits/:tid', TuitController.tuitController.updateTuit);
            // for testing purposes
            app.delete('/api/users/:uid/tuits', TuitController.tuitController.deleteTuitByAuthor);
            app.delete('/api/tuits/content/:tuitContent', TuitController.tuitController.deleteTuitByContent);
        }
        return TuitController.tuitController;
    }
    private constructor() {}

    /**
     * Retrieves all tuits from the database and returns an array of tuits
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
    /**
     * Retrieves a particular tuit instance
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit that matches the tuit ID
     */
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));
    /**
     * Retrieves all tuits from the database for a particular user and returns an array of tuits.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    // findAllTuitsByUser = (req: Request, res: Response) =>
    //     TuitController.tuitDao.findAllTuitsByUser(req.params.uid)
    //         .then(tuits => res.json(tuits));
    findAllTuitsByUser = (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "me" && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id : req.params.uid;

        TuitController.tuitDao
            .findAllTuitsByUser(userId)
            .then((tuits) => res.json(tuits));
    }
    /**
     * Creates a new instance of a tuit
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new tuit to be inserted in the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted in the database
     */
    createTuitByUser = (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "me" && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id : req.params.uid;

        console.log(userId);

        TuitController.tuitDao.createTuitByUser(userId, req.body)
            .then((tuit: Tuit) => res.json(tuit));
    }
    /**
     * Deletes an existing instance of a tuit
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));

    /**
     * Edits a particular instance of a tuit
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a tuit was successful or not
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));

    deleteTuitByAuthor = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuitByAuthor(req.params.uid)
            .then(status => res.json(status));

    deleteTuitByContent = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuitByContent(req.params.tuitContent)
            .then(status => res.json(status));
}