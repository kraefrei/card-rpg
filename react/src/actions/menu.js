const menuActions = {
  OPEN_MENU:'OPEN_MENU',
  CLOSE_MENU:'CLOSE_MENU'
}

export default menuActions;

export function openMenu (x, y, type, key) {
  return {
    type:menuActions.OPEN_MENU,
    payload: {x, y, type, key}
  }
}

export function closeMenu () {
  return {
    type: menuActions.CLOSE_MENU,
  }
}
