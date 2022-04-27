/**
 * @file Controller RESTful web service API for users resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";

/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users to retrieve all the user instances</li>
 *     <li>GET /users/:userid to retrieve a particular user instance</li>
 *     <li>POST /users/ to create a new user instance</li>
 *     <li>PUT /users/:userid to modify an individual user instance </li>
 *     <li>DELETE /users/:userid to remove a particular user instance</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing RESTful Web service API
 */
export default class UserController implements UserControllerI {
   private static userDao: UserDao = UserDao.getInstance();
   private static userController: UserController | null = null;
    /**
     * Create a single instance of the user controller
     * @param {Express} app Express instance to declare the RESTful web service API
     * @return UserController
     */
   public static getInstance = (app: Express): UserController => {
       if (UserController.userController === null) {
           UserController.userController = new UserController();
           app.get('/api/users', UserController.userController.findAllUsers);
           app.get('/api/users/:userid', UserController.userController.findUserById);
           app.post('/api/users', UserController.userController.createUser);
           app.delete('/api/users/:userid', UserController.userController.deleteUser);
           app.put('/api/users/:userid', UserController.userController.updateUser);
           app.delete('/api/users', UserController.userController.deleteAllUsers);
           app.post("/api/login", UserController.userController.login);
           app.post("/api/register", UserController.userController.register);
           app.get('/api/users/username/:username', UserController.userController.findUserByUsername);
           // For testing purposes
           app.get('/api/users/username/:username/delete', UserController.userController.deleteUsersByUsername);
       }
       return UserController.userController;
   }
   private constructor() {}

    /**
     * Retrieves all users from the database and returns an array of users
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
   findAllUsers = (req: Request, res: Response) =>
       UserController.userDao.findAllUsers()
           .then(users => res.json(users));
    /**
     * Retrieves a particular user instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the user ID
     */
   findUserById = (req: Request, res: Response) =>
       UserController.userDao.findUserById(req.params.userid)
           .then(user => res.json(user));
    /**
     * Creates a user instance in the database
     * @param {Request} req The request from the client
     * @param {Response} res The response to the client, including the body as a JSON object containing
     * the user to be created
     */
   createUser = (req: Request, res: Response) =>
       UserController.userDao.createUser(req.body)
           .then(user => res.json(user));
    /**
     * Deletes a user instance in the database
     * @param {Request} req The request from the client, including the path parameter userid representing
     * the user being deleted
     * @param {Response} res The response to the client, including status on whether deleting the user
     * was successful or not
     */
   deleteUser = (req: Request, res: Response) =>
       UserController.userDao.deleteUser(req.params.userid)
           .then(status => res.json(status));
    /**
     * Deletes all user instances in the databases
     * @param req {Request} The request from the client
     * @param res {Response} The response to the client, including status on whether deleting the users was
     * successful or not
     */
   deleteAllUsers = (req: Request, res: Response) =>
       UserController.userDao.deleteAllUsers()
           .then(status => res.json(status));
    /**
     * Edits a particular instance of a user
     * @param {Request} req Represents request from client, including path
     * parameter userid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating the user was successful or not
     */
   updateUser = (req: Request, res: Response) =>
       UserController.userDao.updateUser(req.params.userid, req.body)
           .then(status => res.json(status));

   login = (req: Request, res: Response) =>
       UserController.userDao.findUserByCredentials(req.body.username, req.body.password)
           .then(user => res.json(user));

   register = (req: Request, res: Response) =>
       UserController.userDao.findUserByUsername(req.body.username)
           .then(user=> res.json(user));

   deleteUsersByUsername = (req: Request, res: Response) =>
       UserController.userDao.deleteUsersByUsername(req.params.username)
           .then(status => res.send(status));

   findUserByUsername = (req: Request, res: Response) =>
       UserController.userDao.findUserByUsername(req.params.username)
           .then(user => res.json(user));
}