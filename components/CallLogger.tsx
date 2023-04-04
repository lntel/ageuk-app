import React, { FC, useContext, useState } from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from './Button';
import axios from 'axios';
import apiUrl from '../constants/apiUrl';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../context/AuthContext';

export interface CallLoggerProps {
    id: string;
    visible: boolean;
    startTime: Date;
    endTime: Date;
    startTravelTime: Date;
    endTravelTime: Date;
    onClose: () => void;
}

const CallLogger: FC<CallLoggerProps> = ({ id, visible, onClose, startTime, endTime, endTravelTime, startTravelTime }) => {
    const [start, setStart] = useState<Date>(null);
    const [end, setEnd] = useState<Date>(null);
    const [travelStart, setTravelStart] = useState<Date>(null);
    const [travelEnd, setTravelEnd] = useState<Date>(null);

    const { state } = useContext(AuthContext);

    const submitCallLog = async () => {
        const response = await axios.patch(`${apiUrl}/call/${id}`, {
            startTime: start,
            endTime: end,
            startTravelTime: travelStart,
            endTravelTime: travelEnd
            }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${state.accessToken}`,
            }
            });

            onClose();

            Toast.show({
                type: 'success',
                text2: 'Successfully logged call times',
              });
    }

  return (
    <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => onClose()}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Log your call</Text>
          {!Boolean(startTravelTime) && (
          <View style={styles.timePicker}>
            <Text style={styles.timePickerTitle}>When did you travel to the call?</Text>
            <DateTimePicker
            testID="dateTimePicker"
            value={travelStart}
            mode={'time'}
            is24Hour={true}
            onChange={(e, d) => setTravelStart(d)}
            />
          </View>
          )}
          {!Boolean(endTravelTime) && (
          <View style={styles.timePicker}>
            <Text style={styles.timePickerTitle}>When did you arrive at the call?</Text>
            <DateTimePicker
            testID="dateTimePicker"
            value={travelEnd}
            mode={'time'}
            is24Hour={true}
            onChange={(e, d) => setTravelEnd(d)}
            />
          </View>
          )}
          {!Boolean(startTime) && (
          <View style={styles.timePicker}>
            <Text style={styles.timePickerTitle}>When did the care start?</Text>
            <DateTimePicker
            testID="dateTimePicker"
            value={start}
            mode={'time'}
            is24Hour={true}
            onChange={(e, d) => setStart(d)}
            />
          </View>
          )}
          {!Boolean(endTime) && (
          <View style={styles.timePicker}>
            <Text style={styles.timePickerTitle}>When did the care end?</Text>
            <DateTimePicker
            testID="dateTimePicker"
            value={end}
            mode={'time'}
            is24Hour={true}
            onChange={(e, d) => setEnd(d)}
            />
          </View>
          )}
          <View style={styles.buttons}>
            <Button text="Cancel" style={styles.cancelButton} onPress={() => onClose()} />
            <Button text="Submit" style={styles.submitButton} onPress={() => submitCallLog()} />
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 30,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: '#ff4f4f',
        paddingVertical: 20,
        width: '49%'
    },
    submitButton: {
        paddingVertical: 20,
        width: '49%'
    },
    title: {
        fontSize: 30,
        marginBottom: 20
    },
    timePickerTitle: {
        fontSize: 18,
        marginBottom: 10
    },
    timePicker: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 10
    }
})

export default CallLogger