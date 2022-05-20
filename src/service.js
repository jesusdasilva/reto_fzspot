import _ from 'lodash';
import { HTTP_STATUS_CODES, MESSAGE } from './config.js';
import Model from './model_old.js';

export default {
    async hola() { 
        const httpStatus = HTTP_STATUS_CODES.OK;
        const message = { text: MESSAGE.HOLA }
        const data = (await Model.find({}))

        return { httpStatus, data, message };
    },
    async listTeam() {
        const httpStatus = HTTP_STATUS_CODES.OK;
        let message = MESSAGE.NO_HAY_EQUIPOS;
        const data = (await Model.find({}, { _id: 0, "equipo.id": 1, "equipo.nombre": 1, "equipo.sigla":1, "equipo.paisId":1, "equipos.paisNombre":1, "equipo.tipo":1 }))[0]?.equipo
        .map((team) => ({ id: team.id, nombre: team.nombre, sigla: team.sigla, paisId: team.paisId, paisNombre: team.paisNombre, tipo: team.tipo }));
                
        (data.length > 0) && (message = MESSAGE.LISTADO_EQUIPOS.replace('COUNT', data.length));

        return { httpStatus, data, message };
    },
    async listPlayers({idTeam}) {
        const httpStatus = HTTP_STATUS_CODES.OK;
        let message =  MESSAGE.NO_HAY_JUGADORES;
        const data = (await Model.find({}, { _id: 0, "equipo.id": 1, "equipo.jugadores.jugador": 1 }))[0]?.equipo
            .filter((team) => team.id == idTeam)[0]?.jugadores[0]?.jugador || [];

        (data?.id.length > 0) && (message = MESSAGE.LISTADO_JUGADORES.replace('COUNT', data?.id.length));

        return { httpStatus, data, message };
    },
    async listPosition({position}) {
        const httpStatus = HTTP_STATUS_CODES.OK;
        let message = MESSAGE.NO_HAY_POSICION;
        const data = JSON.parse(JSON.stringify((await Model.find({}, { _id: 0, "equipo.id": 1, "equipo.nombre": 1, "equipo.jugadores.jugador": 1 }))[0].equipo
            .map((team) => ({ id: team.id, nombre: team.nombre, jugadores: team.jugadores[0].jugador}))))
            .map(e => ({ id: e.id, nombre: e.nombre, jugadores: e.jugadores.filter(f => f.rol.nombre === position)})) || [];
        
        
        let cnt = 0; (data) ? data.forEach(e => {e.jugadores.forEach(f => {cnt++})}) : null;
        
        (cnt > 0) && (message = MESSAGE.LISTADO_POSICION.replace('COUNT', cnt));
        
        return { httpStatus, data, message };
    },
}