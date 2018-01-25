import { titleForMapRouteParams } from "../mapRouteParams"

describe("title for map route params", () => {
  const area = { name: "Field" }
  const tag = { name: "Wallet" }

  test("area mode", () => {
    const params = { mode: "area", area, tag }
    const title = titleForMapRouteParams(params)
    expect(title).toBe("Field")
  })

  test("tag mode", () => {
    const params = { mode: "tag", area, tag }
    const title = titleForMapRouteParams(params)
    expect(title).toBe("Wallet")
  })

  test("create mode", () => {
    const params = { mode: "create", area, tag }
    const title = titleForMapRouteParams(params)
    expect(title).toBe("New area")
  })

  test("unknown mode", () => {
    const params = { mode: "bogus", area, tag }
    const title = titleForMapRouteParams(params)
    expect(title).toBe("Map")
  })
})
