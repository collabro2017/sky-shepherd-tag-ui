// Migrations for persisted store. Convert from previous version to current
// version
export default {
  0: state => {
    return {
      ...state,
      area: { ...state.area },
      tag: { ...state.tags },
      map: { ...state.map },
      nav: { ...state.nav },
      data: {
        areas: {},
        tags: {}
      }
    }
  },
  // Remove area.areas and tag.tags
  1: state => {
    return {
      ...state,
      area: {},
      tag: {},
      map: { ...state.map },
      nav: { ...state.nav },
      data: {
        areas: {},
        tags: {}
      }
    }
  }
}
