import { rollDie } from "./roll-die"

describe("roll-die", () => {
    it("gives a number between 1 and 6", () => {
        const number =  rollDie()
        expect(number).toBeGreaterThanOrEqual(1)
        expect(number).toBeLessThanOrEqual(6)
    })
})
