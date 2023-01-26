import React, { useContext, useEffect, useState } from "react";
import { ScrollView, SectionList, Text, View } from "react-native";
import { Patient } from "../../types";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import apiUrl from "../../constants/apiUrl";
import Template from "../../components/Template";
import PatientBadge from "../../components/PatientBadge";
import PatientView from "../../components/PatientView";

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>();

  useEffect(() => {
    getPatients();
  }, []);

  useEffect(() => {
    console.log(selectedPatient);
  }, [selectedPatient]);

  const { state } = useContext(AuthContext);

  const getPatients = async () => {
    const response = await axios.get(`${apiUrl}/patients`, {
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
    });

    if (response.status === 200) {
      setPatients(response.data);
    }
  };

  return (
    <>
      <Template title="Patient Directory">
        {patients.length
          ? patients
              .sort((a, b) => a.surname.localeCompare(b.surname))
              .map((p) => (
                <PatientBadge
                  firstName={p.firstName}
                  lastName={p.surname}
                  mainDiagnosis={p.diagnoses[0]}
                  town={p.city}
                  county={p.county}
                  id={p.id}
                  onSelected={setSelectedPatient}
                />
              ))
          : null}
      </Template>
      <PatientView
        visible={Boolean(selectedPatient)}
        patient={patients.find((p) => p.id === selectedPatient)}
        onClose={() => setSelectedPatient(undefined)}
      />
    </>
  );
};

export default Patients;
