import { sum } from "../src/calc"

describe("test add function", () => {
  it("should add 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3)
  })

  it("should add 2 + 3 to equal 5", () => {
    expect(sum(2, 3)).toBe(5)
  })


})