import express from "express";
import { cache } from "./cache";
import { rollDie } from "./roll-die";

const cacheKey = "dice_roll"

export const app = express()

app.get("/", async (_, res) => {
    const value = await cache.get(cacheKey)
    const number = value || rollDie()

    if (!value) {
        await cache.set(cacheKey, number)
    }

    res.json({
        number
    })
})

