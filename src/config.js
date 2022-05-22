import dotenv from 'dotenv'

dotenv.config()

export const config = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || 'mongodb://localhost/sports'
}

export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
}

export const MESSAGE = {
    HOLA: 'Hola FzSports!',
    NO_HAY_EQUIPOS: 'No hay equipos registrados',
    LISTADO_EQUIPOS: 'Hay COUNT equipos registrados',
    NO_HAY_JUGADORES : 'No hay jugadores en ese equipo',
    LISTADO_JUGADORES: 'Hay COUNT jugadores en ese equipo',
    NO_HAY_POSICION: 'No hay jugadores en esa posición',
    LISTADO_POSICION: 'Hay COUNT jugadores en esa posición'
}