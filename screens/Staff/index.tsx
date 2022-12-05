import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import StaffBadge from "../../components/StaffBadge";
import Template from "../../components/Template";
import apiUrl from "../../constants/apiUrl";
import { AuthContext } from "../../context/AuthContext";

const Staff = ({ navigation }) => {
  const [staff, setStaff] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { state } = useContext(AuthContext);

  useEffect(() => {
    const event = navigation.addListener("focus", () => {
      getStaff();
    });

    return event;
  }, [navigation]);

  const getStaff = async () => {
    const response = await axios.get(`${apiUrl}/staff`, {
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
    });

    console.log(response.data);

    if (response.status === 200) {
      setStaff(response.data);
    }
  };

  const onRefresh = async () => {
    await getStaff();
  }

  return (
    <Template title="Staff Directory" refreshing={refreshing} onRefresh={onRefresh}>
      {staff.length
        ? staff.sort((a, b) => a.surname.localeCompare(b.surname)).map((s) => (
            <StaffBadge
              forename={s.forename}
              surname={s.surname}
              avatarFilename={s.avatarFilename}
              roleName={s.role.name}
              key={s.id}
              workPhone={s.workPhone}
            />
          ))
        : null}
    </Template>
  );
};

const styles = StyleSheet.create({});

export default Staff;
