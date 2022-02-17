"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowDao_1 = __importDefault(require("../daos/FollowDao"));
/**
 * @class FollowController Implements RESTful web service API for follows resource
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/followers to retrieve all users that follow a user</li>
 *     <li>GET /users/:uid/following to retrieve all users that a user is following</li>
 *     <li>POST /users/:uid/follows/:followedUserId to record that a user follows another user</li>
 *     <li>DELETE /users/:uid/unfollows/:unfollowedUserId to record that a user no longer follows a user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing RESTful web service API
 */
class FollowController {
    constructor() {
        /**
         * Retrieves all users that follow a user from the database
         * @param {Request} req The request from the client, including the path parameter uid representing the user
         * who has followers
         * @param {Response} res The response to the client, including the body as a JSON array containing the
         * relevant user objects
         */
        this.findAllFollowersOfUser = (req, res) => FollowController.followDao.findAllFollowersOfUser(req.params.uid)
            .then(follows => res.json(follows));
        /**
         * Retrieves all users that a user is following
         * @param {Request} req The request from the client, including the path parameter uid representing the user
         * who is following others
         * @param {Response} res The response to the client, including the body as a JSON array containing the
         * relevant user objects
         */
        this.findAllUsersThatUserFollows = (req, res) => FollowController.followDao.findAllUsersThatUserFollows(req.params.uid)
            .then(follows => res.json(follows));
        /**
         * Creates a follow instance in the database
         * @param {Request} req The request from the client, including the path parameters uid and followedUsrId
         * representing the user following another user and that user being followed
         * @param {Response} res The response to the client, including the body as a JSON object containing
         * the new follow
         */
        this.userFollowsUser = (req, res) => FollowController.followDao.userFollowsUser(req.params.uid, req.params.followedUserId)
            .then(follow => res.json(follow));
    }
    /**
     * Deletes a follow instance in the database
     * @param {Request} req The request from the client, including the path parameters uid and unfollowedUsrId
     * representing the user unfollowing another user and that user being unfollowed
     * @param {Response} res The response to the client, including status on whether deleting the follow was
     * successful or not
     */
    userUnfollowsUser(req, res) {
        FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.unfollowedUserId)
            .then(status => res.send(status));
    }
}
exports.default = FollowController;
FollowController.followController = null;
FollowController.followDao = FollowDao_1.default.getInstance();
/**
 * Create a single instance of the follow controller
 * @param {Express} app Express instance to declare the RESTful web service API
 * @return FollowController
 */
FollowController.getInstance = (app) => {
    if (FollowController.followController == null) {
        FollowController.followController = new FollowController();
        app.get('/users/:uid/followers', FollowController.followController.findAllFollowersOfUser);
        app.get('/users/:uid/following', FollowController.followController.findAllUsersThatUserFollows);
        app.post('/users/:uid/follows/:followedUserId', FollowController.followController.userFollowsUser);
        app.delete('/users/:uid/unfollows/:unfollowedUserId', FollowController.followController.userUnfollowsUser);
    }
    return FollowController.followController;
};
