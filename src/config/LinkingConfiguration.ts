import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Authorization: {
        screens: {
          Register: {
            screens: {
              LoginScreen: "register"
            }
          },
          Login: {
            screens: {
              LoginScreen: "login"
            }
          }
        }
      }
    }
  }
};
