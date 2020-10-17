enum Screens {
  AUTHORIZATION = 'AUTHORIZATION',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FOOD = 'FOOD',
  DRINK = 'DRINK',
  HOME = 'HOME',
}

export default Screens;
export type ScreensType = keyof typeof Screens;
