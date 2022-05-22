import request from "supertest";
import {expect} from "chai";
import { connDB } from "../src/database.js";
import app from "../src/app.js";
import { HTTP_STATUS_CODES } from "../src/config.js";

let agent = request.agent(app);

connDB();

describe("GET /", () => {
  it("Responder Hola", async () => {
    await agent
      .get("/")
      .expect("Content-Type", /json/)
      .expect(HTTP_STATUS_CODES.OK)
      .expect((res) => {
        expect(res.body.message).to.equal("Hola FzSports!");
      });
  });
});

describe("GET /api/team", () => {
  it("Responder con el Listado de Equipos", async () => {
    await agent
      .get("/api/team")
      .expect("Content-Type", /json/)
      .expect(HTTP_STATUS_CODES.OK)
      .expect(function (res) {
        expect(res.body.data).to.be.an("array");
        expect(res.body.data[0]).to.have.all.keys(
          "id",
          "nombre",
          "sigla",
          "paisId",
          "tipo"
        );
      });
  });
});

describe("GET /teams/:idTeam/players", () => {
  it("Responder con el listado de Jugadores de un equipo especifico", async () => {
    await agent
      .get("/api/teams/143/players")
      .expect("Content-Type", /json/)
      .expect(HTTP_STATUS_CODES.OK)
      .expect(function (res) {
        expect(res.body.data).to.be.an("array");
        expect(res.body.data[0]).to.have.all.keys(
          "id",
          "nombre",
          "apellido",
          "nombreCorto",
          "ladoHabil",
          "fechaNacimiento",
          "horaNacimiento",
          "edad",
          "peso",
          "altura",
          "apodo",
          "rol",
          "camiseta",
          "pais",
          "provincia",
          "clubActual",
          "localidad"
        );
        expect(res.body.data[0].rol).to.have.all.keys("idRol", "nombre");
        expect(res.body.data[0].pais).to.have.all.keys("paisId", "nombre");
        expect(res.body.data[0].clubActual).to.have.all.keys(
          "id",
          "nombre",
          "paisId",
          "paisNombre",
          "paisSigla",
          "tipo"
        );
      });
  });
});

describe('GET /teams/players/:position"', () => {
    it('Responder con el Listado de jugadores de acuerdo a una posición', async () => {
      await agent
        .get('/api/teams/players/Arquero')
        .expect("Content-Type", /json/)
        .expect(HTTP_STATUS_CODES.OK)
        .expect(function (res) {
          expect(res.body.data).to.be.an("array");
          expect(res.body.data[0]).to.have.all.keys(
            "id",
            "nombre",
            "jugadores"
          );
            expect(res.body.data[0].jugadores).to.be.an("array");
            expect(res.body.data[0].jugadores[0]).to.have.all.keys(
                "id",
                "nombre",
                "apellido",
                "nombreCorto",
                "ladoHabil",
                "fechaNacimiento",
                "horaNacimiento",
                "edad",
                "peso",
                "altura",
                "apodo",
                "rol",
                "camiseta",
                "pais",
                "provincia",
                "clubActual",
                "localidad"
            );
            expect(res.body.data[0].jugadores[0].rol).to.have.all.keys(
                "idRol",
                "nombre"
            );
            expect(res.body.data[0].jugadores[0].pais).to.have.all.keys(
                "paisId",
                "nombre"
            );
            expect(res.body.data[0].jugadores[0].clubActual).to.have.all.keys(
                "id",
                "nombre",
                "paisId",
                "paisNombre",
                "paisSigla",
                "tipo"
            );
        });
    });
});