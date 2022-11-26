import React, { FC, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaIcon from "react-native-vector-icons/MaterialIcons";
import DefaultAvatar from "../../assets/images/avatar.svg";
import apiUrl from "../../constants/apiUrl";

export type StaffBadgeProps = {
  forename: string;
  surname: string;
  roleName: string;
  avatarFilename?: string;
};

const StaffBadge: FC<StaffBadgeProps> = ({
  forename,
  surname,
  roleName,
  avatarFilename,
}) => {
  const avatar = { uri: `${apiUrl}/uploads/${avatarFilename}` };

  useEffect(() => {
    console.log(`${apiUrl}/uploads/${avatarFilename}`);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {avatarFilename != null ? (
          <Image
            style={styles.avatar}
            source={avatar}
            onError={(error) => console.error(error)}
          />
        ) : (
          <DefaultAvatar style={styles.defaultAvatar} width={70} height={70} />
        )}
        <View style={styles.information}>
          <Text style={styles.name}>
            {forename} {surname}
          </Text>
          <Text>{roleName}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Icon name="phone-alt" size={30} color="#23A2D1" />
        <MaIcon name="sms" size={30} color="#23A2D1" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "23%",
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

export default StaffBadge;
