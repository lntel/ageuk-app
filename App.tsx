import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import Navigation from "./components/Navigation";
import { toastConfig } from "./config/toast.config";
import { AuthProvider } from "./context/AuthContext";
import Login from "./screens/Login";

// https://reactnative.dev/docs/navigation
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    localBiometricAuth();
  }, []);

  const localBiometricAuth = async () => {
    const canUseBio = await LocalAuthentication.hasHardwareAsync();

    if (canUseBio) await LocalAuthentication.authenticateAsync();
  };

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          {/* https://reactnavigation.org/docs/hiding-tabbar-in-screens */}
          <Stack.Screen name="Home" component={Navigation} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}
