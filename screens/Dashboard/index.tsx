import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import {
  Agenda,
  AgendaEntry,
  AgendaSchedule
} from "react-native-calendars";
import Template from "../../components/Template";
import apiUrl from "../../constants/apiUrl";
import { AuthContext } from "../../context/AuthContext";
import { CalendarEvent as CallEvent } from "../../types";
import CalendarEventProps from "./CalendarEvent";
import EmptyDate from "./EmptyDate";

const Dashboard = () => {
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

  const formatCallsAsItems = () => {
    const events: AgendaSchedule = {};

    calls.forEach((call) => {
      const formattedDate = getDateString(new Date(call.date).toISOString());

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

    if(!call)
      return <EmptyDate />;

    return (
      <CalendarEventProps
        time={call.time}
        date={call.date}
        id={call.id}
        patient={call.patient}
        staff={call.staff}
      />
    );
  };

  const onRefresh = () => {
    loadMonthEvents();
  }

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
    </Template>
  );
};

export default Dashboard;
