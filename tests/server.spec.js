const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("GET /cafes devuelve status 200 y un arreglo con por lo menos 1 objeto", async () => {
        const response = await request(server).get("/cafes").send()
        const status = response.statusCode
        const cafes = response.body
        expect(status).toBe(200)
        expect(cafes).toBeInstanceOf(Array)
        expect(cafes.length).toBeGreaterThanOrEqual(1)
        expect(cafes[0]).toBeInstanceOf(Object)
    })

    it("DELETE /cafes/:id devuelve 404 si el id no existe", async () => {
        const jwt = "token"
        const idInexistente = 999
        const response = await request(server)
            .delete(`/cafes/${idInexistente}`)
            .set("Authorization", jwt)
            .send()
        expect(response.statusCode).toBe(404)
    })

    it("POST /cafes agrega un nuevo café y devuelve 201", async () => {
        const cafe = { id: 5, nombre: "Nuevo café" }
        const response = await request(server).post("/cafes").send(cafe)
        const status = response.statusCode
        const cafes = response.body
        expect(status).toBe(201)
        expect(cafes).toContainEqual(cafe)
    })

    it("PUT /cafes/:id devuelve 400 si el id del parámetro es distinto al id del payload", async () => {
        const idParametro = 1
        const cafe = { id: 2, nombre: "Cortado actualizado" }
        const response = await request(server)
            .put(`/cafes/${idParametro}`)
            .send(cafe)
        expect(response.statusCode).toBe(400)
    })
});
