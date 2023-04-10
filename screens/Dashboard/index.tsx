import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Text } from "react-native";
import { Agenda, AgendaEntry, AgendaSchedule } from "react-native-calendars";
import CallLogger from "../../components/CallLogger";
import Template from "../../components/Template";
import apiUrl from "../../constants/apiUrl";
import { AuthContext } from "../../context/AuthContext";
import { CalendarEvent as CallEvent } from "../../types";
import CalendarEventProps from "./CalendarEvent";
import EmptyDate from "./EmptyDate";

const Dashboard = () => {
  const [selectedCall, setSelectedCall] = useState<CallEvent | null>(null);
  const [calls, setCalls] = useState<CallEvent[]>([]);

  const { state } = useContext(AuthContext);

  useEffect(() => {
    loadMonthEvents();
  }, []);

  const loadMonthEvents = async () => {
    // const { dateString, day } = date;

    try {
      const response = await axios.get(`${apiUrl}/call`, {
        headers: {
          "Content-Type": "applsication/json",
          Accept: "application/json",
          Authorization: `Bearer ${state.accessToken}`,
        },
      });

      const data = response.data;

      setCalls(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDateString = (date: string) => {
    return date.split("T")[0];
  };

  // This has been taken from https://stackoverflow.com/a/17415677
  const toIsoString = (date: Date) => {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            return (num < 10 ? '0' : '') + num;
        };
  
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
  }

  const formatCallsAsItems = () => {
    const events: AgendaSchedule = {};

    calls.forEach((call) => {
      const formattedDate = getDateString(toIsoString(new Date(call.date)));

      const day = formattedDate.split("-")[2];

      const callObject: AgendaEntry = {
        height: 100,
        name: call.id,
        day,
      };

      events[formattedDate] = events[formattedDate]
        ? [...events[formattedDate], callObject]
        : [callObject];
    });

    return events;
  };

  const onRenderItem = (item: AgendaEntry) => {
    const call = calls.find((c) => c.id === item.name);

    if (!call) return <EmptyDate />;

    return (
      <CalendarEventProps
        time={call.time}
        startTravelTime={call.startTravelTime}
        endTravelTime={call.endTravelTime}
        startTime={call.startTime}
        endTime={call.endTime}
        date={call.date}
        id={call.id}
        patient={call.patient}
        staff={call.staff}
        onSelected={(id) => setSelectedCall(calls.find(c => c.id == id))}
      />
    );
  };

  const onRefresh = () => {
    loadMonthEvents();
  };

  return (
    <Template title="Dashboard" onRefresh={onRefresh}>
      <Agenda
        items={formatCallsAsItems()}
        renderItem={onRenderItem}
        renderEmptyData={EmptyDate}
        disableMonthChange={true}
        pastScrollRange={1}
        futureScrollRange={1}
        // minDate="2023-01-14"
        // maxDate={"2023-01-27"}
        renderEmptyDate={() => <View />}
        showClosingKnob={true}
        firstDay={6}
      />
      {Boolean(selectedCall) && (
        <CallLogger visible={Boolean(selectedCall)} onClose={() => setSelectedCall(null)} startTravelTime={selectedCall.startTravelTime}
          endTravelTime={selectedCall.endTravelTime}
          startTime={selectedCall.startTime}
          endTime={selectedCall.endTime} 
          id={selectedCall.id}
          />
      )}
    </Template>
  );
};

export default Dashboard;
