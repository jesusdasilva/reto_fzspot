import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const jugadorSchema = new Schema({
    id: String,
    nombre: String,
    apellido: String,
    nombreCorto: String,
    ladoHabil: String,
    fechaNacimiento: String,
    horaNacimiento: String,
    edad: String,
    peso: String,
    altura: String,
    apodo: String,
    rol: {
      idRol:String,
      nombre: String
    },
    camiseta: String,
    pais: {
      paisId: String,
      nombre: String,
    },
    provincia: String,
    clubActual: {
      id: String,
      nombre: String,
      paisId: String,
      paisNombre: String,
      paisSigla: String,
      tipo: String,
    },
    localidad: String
  },{ collection: 'jugador' })


const jugadoresSchema = new Schema(
  {
    cant: String,
    jugador: [{type: Schema.Types.ObjectId , ref: 'jugador'}],
  },
  { collection: "jugadores" }
);

// const equipoSchema = new Schema({
//   id: String,
//   nombre: String,
//   sigla: String,
//   paisId: String,
//   paisNombre: String,
//   tipo: String,
//   jugadores: [jugadoresSchema],
//   jugadoresDadosBaja: {
//     cant: String
//   }
//   })

// const plantelequipoSchema = new Schema({
//   deporte: {
//         id: String,
//         nombre: String
//       },
//       categoria: {
//         id: String,
//         canal: String,
//         nombre: String
//       },
//       campeonato: {
//         id: String,
//         nombre: String
//       },
//       campeonatoNombreAlternativo: {
//         id: String,
//         nombre: String
//       },
//       fechaActual: String,
//       equipo: [equipoSchema],
//     }
// )

export const jugadorModel = model('jugador', jugadorSchema);
export const jugadoresModel = model('jugadores', jugadoresSchema);
// export const plantelequipo = model('plantelequipo', plantelequipoSchema)
