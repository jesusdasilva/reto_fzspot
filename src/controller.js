import service from './service.js';

export default {
  async hola(_, res, next) {
    try {
      res.locals = await service.hola();
      next();
    } catch (err) {
      next(err);
    }
  },
  async team(_, res, next) {
    try {
      res.locals = await service.listTeam();
      next();
    } catch (err) {
      next(err);
    }
  },
  async players({ params }, res, next) {
    try {
      res.locals = await service.listPlayers(params);
      next();
    } catch (err) {
      next(err);
    }
  },
  async position({ params }, res, next) {
    try {
      res.locals = await service.listPosition(params);
      next();
    } catch (err) {
      next(err);
    }
  }
};