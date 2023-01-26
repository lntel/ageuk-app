import React, { FC } from "react";
import {
  Modal,
  Pressable,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Switch,
} from "react-native";
import { Patient } from "../types";
import LabelledText from "./LabelledText";
import LabelledSwitch from "./LabelledSwitch";
import Icon from "react-native-vector-icons/Ionicons";

export type PatientViewProps = {
  visible: boolean;
  patient?: Patient;
  onClose: () => void;
};

const PatientView: FC<PatientViewProps> = ({ visible, patient, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <ScrollView style={styles.container}>
        <Text style={styles.lastUpdated}>
          Last Updated: {new Date(patient?.updatedAt).toLocaleString()}
        </Text>
        <Text style={styles.fullname}>
          {patient?.firstName}{" "}
          {Boolean(patient?.middleNames) && `${patient?.middleNames} `}
          {patient?.surname}
        </Text>
        <LabelledText
          label="Referred By"
          value={patient?.referredBy}
        />
        <LabelledText
          label="Starting date of care provision"
          value={new Date(patient?.startDate).toLocaleString()}
        />
        <LabelledText
          label="Address"
          value={`${patient?.addressLine}, ${patient?.city}, ${patient?.county}`}
        />
        <LabelledText
          label="Postcode"
          value={patient?.postcode}
        />
        <LabelledText
          label="DOB"
          value={new Date(patient?.dob).toLocaleDateString()}
        />
        <LabelledText
          label="NHS Number"
          value={`${patient?.id.substring(0, 3)} ${patient?.id.substring(3, 6)} ${patient?.id.substring(6, 10)}`}
        />
        <LabelledText
          label="NOK Details"
          value={patient?.nokDetails}
        />
        {Boolean(patient?.firstPointOfContact) && (
            <LabelledText
              label="NOK Details"
              value={patient?.firstPointOfContact}
            />            
            )}
        <Text style={styles.sectionTitle}>Additional Contacts</Text>
        {patient?.additionalContacts.length ? patient.additionalContacts.map((contact, i) =>
            <LabelledText
            label={`Additional Contact ${i+1}`}
            value={contact}
            />            
            ) : (
                <Text style={{
                    marginBottom: 5
                }}>
                No additional contacts have been added
            </Text>
        )}    
        <Text style={styles.sectionTitle}>GP Surgery</Text>
        <LabelledText
          label="Surgery Name"
          value={patient?.generalPractioner?.surgeryName}
        />            
        <LabelledText
          label="Surgery Address"
          value={patient?.generalPractioner?.address}
        />            
        <LabelledText
          label="Surgery Phone Number"
          value={patient?.generalPractioner?.phoneNumber}
        />   
        <Text style={styles.sectionTitle}>Assessment</Text>
        {patient?.assessment ? (
            <LabelledSwitch label="Patient has DNACPR in place" value={patient?.assessment?.dnacpr} />
        ) : (
            <Text>
                Assessment has not yet been completed
            </Text>
        )}
        <Pressable style={styles.closeButton} onPress={onClose}>
            <Icon name="exit" style={{
                fontSize: 24,
                color: '#f1f1f1',
                marginRight: 10
            }} />
          <Text style={{
            color: '#f1f1f1'
          }}>Go Back</Text>
        </Pressable>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 70,
    paddingBottom: 50,
    paddingHorizontal: 25,
    backgroundColor: "#f1f1f1",
    shadowColor: "#222222",
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  cta: {
      backgroundColor: "#23A2D1",
      color: '#f1f1f1',
      padding: 15,
      marginVertical: 5
  },
  closeButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    padding: 15,
    color: '#f1f1f1',
    marginTop: 15
},
  lastUpdated: {
    borderWidth: 1.5,
    borderColor: '#86efac',
    color: '#22c55e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  fullname: {
    fontSize: 30,
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 8
  },
});

export default PatientView;
