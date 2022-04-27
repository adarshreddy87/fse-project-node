Team members: Adarshreddy Kothireddy (section 1), Suneeth Ravi (section 1), Juan Ong (section 2), Georgian Tutuianu (section 2)

### Running the project locally
Pull the most recent code from the `master` branch from this repo and the client repo (https://github.com/adarshreddy87/fse-project-react)

The node server can be started by running `nodemon server.ts`

The react client can be started by running `npm start`

### Project Details
As described in our project pitch, our final project implements two features: bookmarks and lists. When the user goes to the home page, they will notice a bookmark icon at the right edge of every Tuit. This icon can be clicked, which will bookmark it. The icon turns black, and now the user will be able to find that Tuit by clicking Bookmarks in the navigation sidebar.

Additionally, we have also implemented Lists. All interactions for this feature must occur inside the Lists tab in the navigation sidebar. Here, there are three tabs: Users, My Users List, and List Tuits. The way this works is as follows:
* Under Users, you can click the Plus icon to add any user to your list
* Once a user is added, they will be found under the My Users List tab. You can optionally remove the users from your list by clicking the 'X' icon.
* Correspondingly, the List Tuits tab will now render all Tuits created by the users in your list
