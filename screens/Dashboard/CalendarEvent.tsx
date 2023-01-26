import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CalendarEvent as CalendarEventProps } from '../../types';

const CalendarEvent: FC<CalendarEventProps> = ({ time, date, id, patient, staff }) => {

    const onPress = () => {

        // ! Blocker: patient pages need implementing
        // TODO implement a redirect to a specific patient

        const formattedPostcode = patient?.postcode.replaceAll(' ', '+');

        // * https://developers.google.com/maps/documentation/urls/ios-urlscheme#directions
        Linking.openURL(`comgooglemaps://?daddr=${formattedPostcode}&directionsmode=driving`)
      }

    return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <View>
          <Text style={styles.timestamp}>
              {time}
          </Text>
          <Text style={styles.patientName}>
              {patient.firstName} {patient.surname}
          </Text>
          <View>
              {staff.map(s => 
                  <Text style={styles.staffName}>{s.forename} {s.surname}</Text>
              )}
          </View>
        </View>
        <Icon name="directions" style={{
          fontSize: 36,
          color: '#23A2D1'
        }} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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