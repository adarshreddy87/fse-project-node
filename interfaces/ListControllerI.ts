import {Request, Response} from "express";

export default interface ListControllerI {
    getAllUsersInList (req: Request, res: Response): void;
    removeUserFromList (req: Request, res: Response): void;
    addUserToList (req: Request, res: Response): void;
}