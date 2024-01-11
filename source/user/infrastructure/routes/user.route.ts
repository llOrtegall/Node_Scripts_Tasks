import { UserUseCase } from '../../app/userUseCase'
import { Router } from 'express'
import { UserController } from '../controller/user.controller'
import { MongoRepository } from '../respository/mongo.repository'
// import { MysqlRepository } from '../respository/mysql.repository'
const route = Router()

/**
 * TODO: Primero iniciar el repositorio 
 */
const userRepo = new MongoRepository()
// const userRepoMySQL = new MysqlRepository()

/**
 * TODO: Iniciamos Casos de uso
 * * Inyectamos el repositorio
 */
const userUseCase = new UserUseCase(userRepo)

/**
 * TODO: Iniciar el usercontroller
 * * Inyectamos el caso de uso
 */

const userController = new UserController(userUseCase)

/**
 * TODO: Iniciar las rutas
 * * Inyectamos el controlador
 */

route.post('/user', userController.insertController)
route.get('/user', userController.getController)
route.get('/users', userController.listController)

export default route