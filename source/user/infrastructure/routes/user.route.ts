import { MockRepository } from "../respository/mock.repository";
import { UserUseCase } from "../../app/userUseCase";
import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { MongoRepository } from "../respository/mongo.repository";

const route = Router();

/**
 * TODO: Primero iniciar el repositorio
 */
const useRepository = new MockRepository();
const userRepo = new MongoRepository()

/**
 * TODO: Iniciamos Casos de usos
 */
const userUseCase = new UserUseCase(userRepo)

/**
 * TODO: Iniciar el usercontroller
 */

const userController = new UserController(userUseCase)

/**
 * TODO: Iniciar las rutas
 */

route.post('/user', userController.insertController)
route.get('/user', userController.getController)

export default route;