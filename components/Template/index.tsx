import React, { FC, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, RefreshControl } from "react-native";

export type TemplateProps = {
    children: any;
    title: string;
    refreshing?: boolean;
    onRefresh?: () => void;
}

const Template: FC<TemplateProps> = ({ children, title, refreshing, onRefresh }) => {
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