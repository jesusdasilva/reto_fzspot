import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const plantelEquipoSchema = new Schema({
      deporte: {
        id: String,
        nombre: String
      },
      categoria: {
        id: String,
        canal: String,
        nombre: String
      },
      campeonato: {
        id: String,
        nombre: String
      },
      campeonatoNombreAlternativo: {
        id: String,
        nombre: String
      },
      fechaActual: String,
      equipo: [
        {
          id: String,
          nombre: String,
          sigla: String,
          paisId: String,
          paisNombre: String,
          tipo: String,
          jugadores: [{
            cant: String,
            jugador: 
              {
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
                  idRol: String,
                  nombre: String
                },
                camiseta: String,
                pais: {
                  paisId: String,
                  nombre: String
                },
                provincia: String,
                clubActual: {
                  id: String,
                  nombre: String,
                  paisId: String,
                  paisNombre: String,
                  paisSigla: String,
                  tipo: String
                },
                localidad: String,
              },
          }],
          jugadoresDadosBaja: {
            cant: String
          }
        }
      ]
  },{ collection: "plantelEquipo" }
)

export default model('plantelEquipo', plantelEquipoSchema)