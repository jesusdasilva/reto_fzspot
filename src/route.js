import { Router } from "express";
import controller from "./controller.js";

const route = Router();

route
    .get("/", controller.hola)
    .get("/plantel-equipo", controller.plantelEquipo)
    .get("/team", controller.team)
    .get("/teams/:idTeam/players", controller.players)
    .get("/teams/players/:position", controller.position)

export default route;