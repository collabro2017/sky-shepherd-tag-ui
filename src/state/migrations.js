// Migrations for persisted store. Convert from previous version to current
// version
export const migrations = {
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
  }
}
