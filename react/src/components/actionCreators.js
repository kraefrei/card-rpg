export const types = {
  NEW_CARD: {},
  SELECT: {},
  DESELECT: {},
  MOVE: {}
};
export function newCard (props) {
  return {type: types.NEW_CARD, props}
}
export function selectCard (key, x, y) {
  return {type: types.SELECT, key, x, y}
}
export function deselectCard (key) {
  return {type:types.DESELECT, key}
}
export function moveCard (key, x, y) {
  return {type:types.MOVE, key, x, y}
}
