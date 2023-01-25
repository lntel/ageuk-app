import React, { FC } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CalendarEvent as CalendarEventProps } from '../../types';
import { useNavigation } from '@react-navigation/native';

const CalendarEvent: FC<CalendarEventProps> = ({ time, date, id, patient, staff }) => {

    const navigation = useNavigation();

    const onPress = () => {

        // ! Blocker: patient pages need implementing
        // TODO implement a redirect to a specific patient

      console.log(patient.id)
    //   navigation.navigate()
    }

    return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.timestamp}>
            {time}
        </Text>
        <Text style={styles.patientName}>
            {patient.firstName} {patient.surname}
        </Text>
        <ScrollView>
            {staff.map(s => 
                <Text style={styles.staffName}>{s.forename} {s.surname}</Text>
            )}
        </ScrollView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    fontSize: 16,
    color: 'black',
  },
  timestamp: {
    color: '#94a3b8',
    marginTop: 35,
    marginBottom: 10,
    fontSize: 16
  },
  patientName: {
      color: '#1e293b',
      fontSize: 20,
      marginBottom: 10
    },
    staffName: {
      color: '#64748b',
      marginTop: 3,
      fontSize: 16
    },
});

export default CalendarEvent