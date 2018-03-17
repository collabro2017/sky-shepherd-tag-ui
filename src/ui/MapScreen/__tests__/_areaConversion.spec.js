import {
  areaFromNameAndCoordinates,
  coordinatesFromArea,
  isInside,
  regionFromArea
} from "../areaConversion"

describe("Chester hill", () => {
  const chesterHillAreaData = {
    centroid: {
      latitude: 46.81204,
      longitude: -92.0957
    },
    identifier: 304719280,//-570543923,
    maxIdx: { x: 116, y: 202 },
    maxPos: { x: -9209512, y: 4681305 },
    minPos: { x: -9209628, y: 4681103 },
    name: "chester hill",
    points: {
      pointsArray: [
        { x: 24, y: 202 },
        { x: 89, y: 197 },
        { x: 116, y: 63 },
        { x: 70, y: 0 },
        { x: 0, y: 45 }
      ]
    },
    ptCnt: 5,
    scale: 16
  }
  const chesterHillArea = {
    ...chesterHillAreaData,
    id: "YI8df6tRu7",
    createdAt: "2017-10-25T20:14:03.887Z",
    updatedAt: "2018-01-24T17:14:27.746Z"
  }
  const chesterHillCoordinates = [
    { latitude: 46.81305, longitude: -92.09604 },
    { latitude: 46.813, longitude: -92.09539 },
    { latitude: 46.81166, longitude: -92.09512 },
    { latitude: 46.81103, longitude: -92.09558 },
    { latitude: 46.81148, longitude: -92.09628 }
  ]

  it("converts area to coordinates", () => {
    const coordinates = coordinatesFromArea(chesterHillArea)
    expect(coordinates).toEqual(chesterHillCoordinates)
  })

  it("converts coordinates to area data", () => {
    const areaData = areaFromNameAndCoordinates(
      "chester hill",
      chesterHillCoordinates
    )
    expect(areaData).toEqual(chesterHillAreaData)
  })

  it("converts area to region", () => {
    let region = {
      latitude: 46.81204,
      latitudeDelta: 0.0022220000000000005,
      longitude: -92.0957,
      longitudeDelta: 0.001276
    }

    expect(regionFromArea(chesterHillArea)).toEqual(region)
  })

  it("detects a lat/long point inside area", () => {
    let coordinate = {
      latitude: 46.812,
      longitude: -92.096
    }

    expect(isInside(chesterHillArea, coordinate)).toBe(true)
  })

  it("detects a lat/long coordinate outside area", () => {
    let coordinate = {
      latitude: 46.8,
      longitude: -92.1
    }
    expect(isInside(chesterHillArea, coordinate)).toBe(false)
  })
})
