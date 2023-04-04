import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CalendarEvent as CalendarEventProps } from '../../types';

const CalendarEvent: FC<CalendarEventProps> = ({ time, startTravelTime, endTravelTime, startTime, endTime, date, id, patient, staff, onSelected }) => {

  const getCallStatus = () => {
    if(Boolean(startTravelTime) && !Boolean(endTravelTime)) return "In-Transit";
    if((Boolean(startTime) || Boolean(endTravelTime)) && !Boolean(endTime)) return "In-Progress";
    if(Boolean(startTravelTime) && Boolean(endTravelTime) && Boolean(startTime) && Boolean(endTime)) return "Complete";
    return "Incomplete";
  }

    const openPatientOnMap = () => {

      console.log(`status${getCallStatus()}`)

        // ! Blocker: patient pages need implementing
        // TODO implement a redirect to a specific patient

        const formattedPostcode = patient?.postcode.replaceAll(' ', '+');

        // * https://developers.google.com/maps/documentation/urls/ios-urlscheme#directions
        Linking.openURL(`comgooglemaps://?daddr=${formattedPostcode}&directionsmode=driving`)
      }

    return (
    <TouchableOpacity style={styles.container} onPress={() => onSelected(id)}>
        <View>
          <Text style={styles.timestamp}>
              {time}
          </Text>
          <Text style={styles.patientName}>
              {patient.firstName} {patient.surname}
          </Text>
          <Text style={styles[`status${getCallStatus()}`]}>
            {getCallStatus()}
          </Text>
          <View>
              {staff.map(s => 
                  <Text style={styles.staffName}>{s.forename} {s.surname}</Text>
              )}
          </View>
        </View>
        <Icon name="directions" onPress={openPatientOnMap} style={{
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
    statusIncomplete: {
      backgroundColor: '#e75555',
      color: '#fff',
      marginBottom: 10,
      textTransform: 'uppercase',
      fontSize: 12,
      padding: 5,
      borderRadius: 10,
      maxWidth: 200,
      width: 130,
    },
    statusComplete: {
      backgroundColor: '#73fd96',
      color: '#222',
      marginBottom: 10,
      textTransform: 'uppercase',
      fontSize: 12,
      padding: 5,
      borderRadius: 10,
      maxWidth: 200,
      width: 130,
    }
});

export default CalendarEvent