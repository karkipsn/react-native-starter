import { Button } from "react-native";
import { AuthScreenProps } from "../../types";

export default ({ navigation }: AuthScreenProps<'SignIn'>) => (
  <>
    <Button title="Sign In" onPress={() => alert("todo!")} />
    <Button title="Sign Up" onPress={() => navigation.push("SignUp")} />
  </>
);
