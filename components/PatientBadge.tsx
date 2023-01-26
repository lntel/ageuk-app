import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type PatientBadgeProps = {
    id: string;
    firstName: string;
    lastName: string;
    town: string;
    county: string;
    mainDiagnosis: string;
    onSelected: (id: string) => void;
}

const PatientBadge: FC<PatientBadgeProps> = ({ firstName, lastName, mainDiagnosis, town, county, id, onSelected }) => {

    const navigation = useNavigation();

    

  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelected(id)}>
        <Text style={styles.name}>
            {firstName} {lastName}
        </Text>
        <Text style={styles.location}>
            {town}, {county}
        </Text>
        <Text style={styles.data}>
            {mainDiagnosis}
        </Text>
    </TouchableOpacity>
  )
}

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
    name: {
      fontSize: 18,
      marginBottom: 8,
    },
    location: {
        fontWeight: '700',
        marginBottom: 8
    },
    data: {
        color: '#475569'
    },
  });
  

export default PatientBadge