const utilActions = {
  MULTI_ACTION:'MULTI_ACTION'
}

export default utilActions

export function multiAction (...actions) {
  return {
    type:utilActions.MULTI_ACTION,
    payload: actions
  }
}
