const cardsActions = {
  NEW_CARD: 'NEW_CARD',
  DELETE_CARD: 'DELETE_CARD',
  SELECT: 'SELECT',
  DESELECT: 'DESELECT',
  MOVE: 'MOVE',
};

export default cardsActions;

export function newCard (props) {
  return {type: cardsActions.NEW_CARD, props}
}
export function deleteCard (key) {
  return {type: cardsActions.DELETE_CARD, payload:{key}}
}
export function selectCard (key, x, y) {
  return {type: cardsActions.SELECT, key, x, y}
}
export function deselectCard (key) {
  return {type:cardsActions.DESELECT, key}
}
export function moveCard (key, x, y) {
  return {type:cardsActions.MOVE, key, x, y}
}
