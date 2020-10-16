import * as React from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { styles } from "./styles";

export default function AuthorizationScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        mode="outlined"
        style={styles.button}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        mode="outlined"
        secureTextEntry={true}
        style={styles.button}
      />
      <View style={styles.buttonsContainer}>
        <Button icon="login" compact>
          Login
        </Button>
        <Button icon="account-plus-outline" compact>
          Register
        </Button>
      </View>
    </View>
  );
}
