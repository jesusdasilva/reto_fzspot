import mongoose from "mongoose";
import { config } from "../src/config.js";
// import { connDB } from "../src/database.js";
import data from './nuevo.json' assert {type: 'json'};
import {jugadoresModel, jugadorModel} from '../src/model.js';

const connDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/sports');
  } catch (err) {
    console.error(err);
  }
};

connDB();


// let jugador = []
// let jugadores = []

async function insertJugador(jugador) {
  return await jugadorModel.collection.insertMany(
    jugador,
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Multiple documents inserted to Jugador Collection");
      }
    }
  );
}

async function insertJugadores(jugadores) {

  return await jugadoresModel.collection.insertMany(jugadores, function(err, docs) {
    if (err) {
      console.log(err);
      } else {
        console.log("Multiple documents inserted to Jugadores Collection");
      }
     });
}


// Crear jugadores
data.plantelEquipo.equipo.forEach(async function(e){
  let jugador = []
  e.jugadores.jugador.forEach(async function(j){jugador.push(j)})
  
  await insertJugador(jugador)
});

// data.plantelEquipo.equipo.forEach(function(e){
//   let jugador = []
//   e.jugadores.jugador.forEach(async (j) => {
//     console.log('Equipo', e.nombre)
//     jugador.push(await jugadorModel.findOne({id: j.id},{_id:1}))
//   })
//   console.log(jugador)
// })

let jugadores = []
for( const equipo of data.plantelEquipo.equipo ){
  let jugadoresREf = []
  for(const jugador of equipo.jugadores.jugador){
    jugadoresREf.push(await jugadorModel.findOne({id: jugador.id}, {_id:1}))
  }

  jugadores.push({
    cant: equipo.jugadores.cant,
    jugador: jugadoresREf
  })
}

await insertJugadores(jugadores)

// mongoose.connection.once('open', () => {
  
    // console.log('Connected to MongoDB');
    
    // await jugadorModel.collection.insertMany(jugador, function (err, docs) {
    //     if (err){ 
    //         return console.error(err);
    //     } else {
    //       console.log("Multiple documents inserted to Collection");
    //       console.log(docs)
    //       // process.exit();
    //     }
    //   });

// console.log(await jugadorModel.find({id:'8286'}))

// process.exit();