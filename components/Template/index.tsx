import React, { FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, RefreshControl, Platform } from "react-native";
import { AuthContext } from '../../context/AuthContext';
import apiUrl from '../../constants/apiUrl';
import EventSource, { EventSourceEvent, EventSourceListener } from 'react-native-sse';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { AndroidNotificationPriority } from 'expo-notifications/build/Notifications.types';

export type TemplateProps = {
    children: any;
    title: string;
    refreshing?: boolean;
    onRefresh?: () => void;
}

const Template: FC<TemplateProps> = ({ children, title, refreshing, onRefresh }) => {

    const [notifications, setNotifications] = useState<any[]>([]);

    const { state } = useContext(AuthContext);

    // https://www.npmjs.com/package/react-native-sse
    useEffect(() => {
        const url = new URL(`${apiUrl}/notifications/sse`);

        const eventSource = new EventSource(url, {
            headers: {
                Authorization: {
                    toString: () => {
                        return "Bearer " + state.accessToken;
                    },
                }
            }
        });

        eventSource.addEventListener('message', handleMessage);

        requestNotificationPermissions();

        return () => {
            eventSource.removeAllEventListeners();
            eventSource.close();
        }
    }, [notifications]);

    // https://docs.expo.dev/versions/latest/sdk/notifications/#usage
    const requestNotificationPermissions = async () => {

        if(Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
        
            if(existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
            }
        }

        
    }

    const handleMessage: EventSourceListener<never> = async (event: EventSourceEvent | CustomEvent<never>) => {
        if(event.type !== 'message') return;

        const data = JSON.parse(event['data']);

        const newNotifications = data.filter(notification => !notifications.find(n => n.id === notification.id));

        if(newNotifications.length && notifications.length) {
            newNotifications.forEach(notification => {
                // https://docs.expo.dev/versions/latest/sdk/notifications/#usage
                queueNotification({
                    content: {
                      title: 'Important Notification',
                      body: notification.content,
                      priority: AndroidNotificationPriority.HIGH,
                      autoDismiss: false,
                      sound: true,
                      sticky: true,
                    },
                    trigger: {
                      seconds: 1,
                    },
                  })
                console.log(notification)
            });
        }

        setNotifications(data);
    }

    const queueNotification = async (request: Notifications.NotificationRequestInput) => {
        if(Platform.OS === 'android') {
            // await Notifications.scheduleNotificationAsync({
            //     content: {
            //       title: "You've got mail! 📬",
            //     },
            //     trigger: {
            //       seconds: 2,
            //       channelId: 'new-emails',
            //     },
            //   });
        } else {
            await Notifications.scheduleNotificationAsync(request);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.templateContainer}>
                <Text style={styles.title}>{ title }</Text>
                <ScrollView style={styles.scrollView} refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                    { children }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
  };
  
  const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
    },
    templateContainer: {
        padding: 16,
        width: '100%',
        flex: 1,
    },
    scrollView: {
        padding: 16,
        paddingHorizontal: 2
    },
    title: {
        fontSize: 26,
        marginVertical: 10
    }
  });

export default Template