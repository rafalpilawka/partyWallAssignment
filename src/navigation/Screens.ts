enum Screens {
  AUTHORIZATION = 'AUTHORIZATION',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FOOD = 'FOOD',
  DRINK = 'DRINK',
  HOME = 'HOME',
  ADD = 'ADD',
  EDIT = 'EDIT',
}

export default Screens;
export type ScreensType = keyof typeof Screens;
