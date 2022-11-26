import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Dashboard from "../../screens/Dashboard";
import Patients from "../../screens/Patients";
import Staff from "../../screens/Staff";
import Surgeries from "../../screens/Surgeries";
import Topbar from "./Topbar";

const logoImage = require("../../assets/images/age-uk-logo-no-strap.png");

const Tab = createBottomTabNavigator();

const Navigation = () => {
  // https://reactnavigation.org/docs/tab-based-navigation#customizing-the-appearance
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "11%",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowRadius: 8,
          shadowOpacity: 0.2,
        },
        header: () => <Topbar />,
        headerStyle: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // height: "100%",
          backgroundColor: "#ffffff",
          shadowColor: "#222222",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowRadius: 8,
          shadowOpacity: 0.2,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;

            case "Patients":
              iconName = "people-alt";
              break;

            case "Staff":
              iconName = "medical-services";
              break;

            case "Surgeries":
              iconName = "store";
              break;
          }

          // https://stackoverflow.com/a/67564092
          return (
            <View
              style={[
                focused
                  ? { borderTopColor: "#222222" }
                  : { borderTopColor: "transparent" },
                {
                  borderTopWidth: 4,
                  height: "100%",
                  width: "70%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Icon name={iconName} size={30} color="#222222" />
              <Text style={{
                marginTop: 4
              }}>{route.name}</Text>
            </View>
          );
        },
        tabBarLabel: ({ focused }) => {
          // return <Text>{route.name}</Text>;
        },
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Patients" component={Patients} />
      <Tab.Screen name="Staff" component={Staff} />
      <Tab.Screen name="Surgeries" component={Surgeries} />
    </Tab.Navigator>
  );
};

export default Navigation;
