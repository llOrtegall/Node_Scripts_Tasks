import { Router } from "express";
import { getUser, inserUser } from '../controller/user.controller'

const route = Router();

route.post(`/user`, inserUser);

route.get(`/user`, getUser);

export default route;