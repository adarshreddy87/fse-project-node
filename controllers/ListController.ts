/**
 * @file Controller RESTful web service API for lists resource
 */
import {Request, Response, Express} from "express";
import ListControllerI from "../interfaces/ListControllerI";
import ListDao from "../daos/ListDao";
import TuitDao from "../daos/TuitDao";
import UserDao from "../daos/UserDao";

/**
 * @class ListController Implements RESTful web service API for lists resource
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/lists to retrieve all users added to a list by the logged in user</li>
 *     <li>POST /api/users/:uid/lists/:userId to add a user to the users list</li>
 *     <li>DELETE /api/users/:uid/lists/:userId to delete that user from the users list</li>
 * </ul>
 * @property {ListDao} listDao Singleton DAO implementing lists CRUD operations
 * @property {ListController} listController Singleton controller implementing RESTful web service API
 */
export default class ListController implements ListControllerI {
    private static listDao: ListDao = ListDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static userDao: UserDao = UserDao.getInstance();
    private static listController: ListController | null = null;
    /**
     * Create a single instance of the list controller
     * @param {Express} app Express instance to declare the RESTful web service API
     * @return ListController
     */
    public static getInstance = (app: Express): ListController => {
        if (ListController.listController === null) {
            ListController.listController = new ListController();
            app.get('/api/users/:uid/lists', ListController.listController.getAllUsersInList);
            app.get('/api/users/:uid/not/lists', ListController.listController.getAllUsersNotInList);
            app.get('/api/users/:uid/lists/tuits', ListController.listController.getAllUsersTuitsInList);
            app.post('/api/users/:uid/lists/:userId', ListController.listController.addUserToList);
            app.delete('/api/users/:uid/lists/:userId', ListController.listController.removeUserFromList);
        }
        return ListController.listController;
    }

    private constructor() {
    }

    /**
     * Retrieves all the users in the list from the database
     * @param {Request} req The request from the client, including the path parameter uid representing the user
     * id of the logged in user.
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant user objects
     */
    getAllUsersInList = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;
        ListController.listDao.getAllUsersInList(userId)
            .then(users => res.json(users));
    }

    /**
     * Deletes a user from the the users in the list from the database
     * @param {Request} req The request from the client, including the path parameter uid representing the user
     * id of the logged in user and parameter userId representing the user to be removed from the list.
     * @param {Response} res The response to the client, including the status whether deletion was
     * successful or not.
     */
    removeUserFromList = (req: Request, res: Response) => {
        ListController.listDao.removeUserFromList(req.params.uid, req.params.userId)
            .then(status => res.send(status));
    }

    /**
     * Adds a user to the users in the list from the database
     * @param {Request} req The request from the client, including the path parameter uid representing the user
     * id of the logged in user and parameter userId representing the user to be added to the list.
     * @param {Response} res The response to the client, including the body as a JSON object
     * containing the user.
     */
    addUserToList = (req: Request, res: Response) => {
        ListController.listDao.addUserToList(req.params.uid, req.params.userId)
            .then(status => res.send(status));
    }

    /**
     * Retrieves all the users not in the user list from the database
     * @param {Request} req The request from the client, including the path parameter uid representing the user
     * id of the logged in user.
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant user objects
     */
    getAllUsersNotInList = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;
        let users : any[] = [];
        let usersList : any[] = [];
        let usersNotInList: any[] = [];
        users = await ListController.userDao.findAllUsers();
        usersList = await ListController.listDao.getAllUsersInList(userId);
        let usersListIds: any[] = [];
        for (let user of usersList) {
            usersListIds.push(user.addedUser._id.toString())
        }
        for (let user of users) {
            if (!(usersListIds.includes(user._id.toString()))) {
                usersNotInList.push(user)
            }
        }
        return res.json(usersNotInList);
    }

    /**
     * Retrieves all the tuits of the users in the list from the database
     * @param {Request} req The request from the client, including the path parameter uid representing the user
     * id of the logged in user.
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant tuit objects
     */
    getAllUsersTuitsInList = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;
        let usersList: any[] = [];
        let usersListIds : any[] = [];
        let tuitsList: any[] = [];
        usersList = await ListController.listDao.getAllUsersInList(userId);
        for (let user of usersList) {
            usersListIds.push(user.addedUser._id)
        }
        for (let userId of usersListIds) {
            let tuit = await ListController.tuitDao.findAllTuitsByUser(userId)
            if (!(tuit.length == 0)) {
                tuitsList.push(tuit)
            }
        }
        return res.json(tuitsList);
    }
};
