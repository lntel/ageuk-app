import axios from "axios";
import React, { useContext, useState } from "react";
import { Text } from "react-native";
import GpBadge from "../../components/GpBadge";
import Template from "../../components/Template";
import apiUrl from "../../constants/apiUrl";
import { AuthContext } from "../../context/AuthContext";

const Surgeries = () => {
  const [gp, setGp] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { state } = useContext(AuthContext);

  const getGps = async () => {
    const response = await axios.get(`${apiUrl}/gp`, {
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
    });

    console.log(response.data);

    if (response.status === 200) {
      setGp(response.data);
    }
  };

  const onRefresh = async () => {
    await getGps();
  }

  return (
    <Template title="GP Directory" refreshing={refreshing} onRefresh={onRefresh}>
      {gp.length
        ? gp.map((g) => (
            <GpBadge
            name={g.surgeryName}
            address={g.address}
            phoneNumber={g.phoneNumber}
            />
          ))
        : null}
    </Template>
  );
};

export default Surgeries;
