import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from "react-native";
import Template from '../../components/Template';
import { Agenda, AgendaSchedule, DateData } from 'react-native-calendars';
import CalendarEvent from './CalendarEvent';
import axios from 'axios';
import apiUrl from '../../constants/apiUrl';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {

  const [events, setEvents] = useState<AgendaSchedule>();

  useEffect(() => {
    console.log(events)
  }, [events])
  

  const loadMonthEvents = async (date: DateData) => {
    const { dateString, day } = date;

    setEvents({
      [dateString]: [{
        name: 'test',
        day: String(day),
        height: 80
      }]
    })

    const { state } = useContext(AuthContext);

    try {
      const response = await axios.post(`${apiUrl}/call`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${state.accessToken}`,
        }
      });

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Template title="Dashboard">
      <Agenda 
      // items={{
      //   '2023-01-01': [{name: 'item1', height: 80, day: '1'}]
      // }}
      // markedDates={{
      //   '2023-01-29': {marked: true}
      // }}
      // renderItem={() => <View />}
      items={events}
      onMonthChange={loadMonthEvents}
      disableMonthChange={true}
      minDate='2023-01-14'
      maxDate={'2023-01-27'}
      renderEmptyDate={() => <View />}
      showClosingKnob={true}
      firstDay={6}
      />
    </Template>
  )
}

export default Dashboard