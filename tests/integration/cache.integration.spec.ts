import { cache } from "../../src/cache"
import { app } from "../../src/app"
import request from "supertest"

describe('cache.integration', () => {
    it('saves the rolled die number', async () => {
        expect.assertions(2)

        const cacheSetSpy = jest.spyOn(cache, "set")

        await request(app).get("/")
        const keys = await cache.keys("*")

        expect(cacheSetSpy).toHaveBeenCalledTimes(1)
        expect(keys).toHaveLength(1)

        await cache.flushall()
        cacheSetSpy.mockRestore()
    })

    it('uses the cached rolled die number', async () => {
        expect.assertions(4)

        const cacheGetSpy = jest.spyOn(cache, "get")

        const firstResponse = await request(app).get("/")
        const firstResult = await cacheGetSpy.mock.results[0].value

        const secondResponse = await request(app).get("/")
        const secondResult = await cacheGetSpy.mock.results[1].value

        const firstRoll = Number(firstResponse.body.number)
        const secondRoll = Number(secondResponse.body.number)

        expect(cacheGetSpy).toHaveBeenCalledTimes(2)
        expect(firstResult).toBe(null)
        expect(secondResult).toBeDefined()
        expect(secondRoll).toBe(firstRoll)

        await cache.flushall()
        cacheGetSpy.mockRestore()
    })
})

afterAll(async () => {
    await cache.quit()
})
