import axios from "axios";
import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Toast from "react-native-toast-message";
import Button from "../../components/Button";
import Textbox from "../../components/Textbox";
import apiUrl from "../../constants/apiUrl";
import { AuthContext } from "../../context/AuthContext";

const logoImage = require("../../assets/images/age-uk-logo-no-strap.png");
const backgroundImage = {
  uri: "https://images3.alphacoders.com/101/thumb-1920-1010294.jpg",
};

const Login = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = useState<string>("joeharris461767@gmail.com");
  const [password, setPassword] = useState<string>("testing123");

  const { state, dispatch } = useContext(AuthContext);

  const handleLogin = async () => {

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        emailAddress,
        password,
      }, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
      });
      
      dispatch({
        type: 'SET_ACCESS_TOKEN',
        state: {
          accessToken: response.data.accessToken
        }
      });

      dispatch({
        type: 'SET_REFRESH_TOKEN',
        state: {
          refreshToken: response.data.refreshToken
        }
      });

      Toast.show({
        type: 'success',
        text2: 'Successfully signed in',
      });

      // https://reactnative.dev/docs/navigation
      navigation.navigate('Home');
    } catch (error) {
        if(error.response.status === 500)
            return Alert.alert("Error", "An error has occurred, please contact the office");        
        
        const { message } = error.response.data;

        Toast.show({
          type: 'error',
          text2: message,
        });
    }
  };

  return (
    // https://reactnative.dev/docs/keyboardavoidingview
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.backgroundImage}
        blurRadius={8}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ backgroundColor: "#000000" }}
        >
          <View style={styles.loginContainer}>
            <Image source={logoImage} />
            <Text style={styles.loginHeading}>Sign In</Text>
            <Textbox
              keyboardType="email-address"
              placeholder="Email Address"
              value={emailAddress}
              style={styles.textbox}
              onChangeText={setEmailAddress}
            />
            <Textbox
              placeholder="Password"
              value={password}
              style={styles.textbox}
              onChangeText={setPassword}
              password={true}
            />
            <Button
              style={styles.button}
              text="Sign In"
              onPress={handleLogin}
            />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000000",
    backgroundColor: "##99999980",
    zIndex: 1,
  },
  loginHeading: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 30,
    marginBottom: 60,
  },
  textbox: {
    width: "75%",
    fontSize: 17,
    marginBottom: 20,
  },
  button: {
    width: "75%",
  },
});

export default Login;
