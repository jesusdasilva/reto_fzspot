// import moment from 'moment';
// import dao from './dao.js';
import { HTTP_STATUS_CODES, MESSAGE } from './config.js';
import Model from './model.js';

export default {
    async hola() { 
        const data = {}
        const httpStatus = HTTP_STATUS_CODES.OK;
        const message = { text: MESSAGE.HOLA }

        return { httpStatus, data, message };
    },
    async listTeam() {
        let httpStatus = HTTP_STATUS_CODES.OK;
        let message = MESSAGE.NO_HAY_EQUIPOS;

        // const values = await Model.find({}, {'plantelEquipo.equipo.id':1, 'plantelEquipo.equipo.nombre':1}) || [];
        const values = await Model.find() || [];

        const data = values //.map(value => value.plantelEquipo.equipo.map(equipo => ({id:equipo.id, nombre: equipo.nombre})))[0];
        
        // (data.length > 0) && (message = MESSAGE.LISTADO_EQUIPOS.replace('COUNT', data.length));

        return { httpStatus, data, message };
    },
    async listPlayers({idTeam}) {
        let httpStatus = HTTP_STATUS_CODES.OK;
        let message = { text: MESSAGE.TEXT.RESERVATION_ALL_HOURS_AVAILABLE, type: MESSAGE.TYPE.INFO };

        // const values = await Model.find({"plantelEquipo.equipo.id": "143"}) || [];
        
    const values2 = await Model.find({"plantelEquipo.equipo.id":"143"}) || [];
        // const data = values.map(value => value.plantelEquipo.equipo.map(equipo => ({id:equipo.id, nombre: equipo.nombre})))[0];
        const data = values2

        return { httpStatus, data, message };
    },
    async listPosition({ rEmail, rYear, rMonth, rDay }) {
        let httpStatus = HTTP_STATUS_CODES.OK;
        let message = { text: MESSAGE.TEXT.RESERVATION_ALLREADY_EXISTS, type: MESSAGE.TYPE.INFO };

        const values = { rEmail, rYear, rMonth, rDay }
        const data = await dao.reservation.getActive(values) || [];
        
        if(data.length == 0) {
            message.text = MESSAGE.TEXT.RESERVATION_RESERVATION_NOT_ACTIVE;
        }            

        return { httpStatus, data, message };
    },
}