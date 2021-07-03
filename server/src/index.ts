import 'reflect-metadata';
// import {createConnection} from "typeorm";
import express from 'express';
// import {User} from "./entity/User";

(async () => {
  const app = express();
  app.get('/', (_req, res) => res.send('Hello World'));
  app.listen(3000, () => console.log('Server started: Listening at port 3000'));
})();

// eslint-disable-next-line max-len
// createConnection().then(async (connection: { manager: { save: (arg0: User) => any; find: (arg0: typeof User) => any; }; }) => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch((error: any) => console.log(error));
