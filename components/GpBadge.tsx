import React, { FC } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaIcon from "react-native-vector-icons/MaterialIcons";

export type GpBadgeProps = {
  name: string;
  address: string;
  phoneNumber: string;
};

const GpBadge: FC<GpBadgeProps> = ({
  name,
  address,
  phoneNumber
}) => {

  const openGpOnMap = () => {

      const formattedAddress = address.replaceAll(' ', '+');

      // * https://developers.google.com/maps/documentation/urls/ios-urlscheme#directions
      Linking.openURL(`comgooglemaps://?daddr=${formattedAddress}&directionsmode=driving`)
    }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.information}>
          <Text style={styles.name}>
            {name}
          </Text>
          <Text>{address}</Text>
        </View>
      </View>
      <View style={styles.actions}>
      {phoneNumber ? (
        <>
        <Icon name="phone-alt" size={30} color="#23A2D1" onPress={() => Linking.openURL(`tel://${phoneNumber}`)} />
        <MaIcon name="sms" size={30} color="#23A2D1" onPress={() => Linking.openURL(`sms://${phoneNumber}`)} />        
        </>
          ) : null}
      <Icon name="directions" onPress={openGpOnMap} style={{
        fontSize: 30,
        color: '#23A2D1'
      }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
    backgroundColor: "#f1f1f1",
    shadowColor: "#222222",
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    marginBottom: 16,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  actions: {
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "35%",
  },
  information: {},
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  defaultAvatar: {
    marginRight: 15,
  },
  name: {
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 8,
  },
});

export default GpBadge;
