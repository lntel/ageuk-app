import React, { FC } from 'react';
import { StyleSheet, View } from "react-native";
import Topbar from '../Topbar';

export type TemplateProps = {
    children: any;
}

const Template: FC<TemplateProps> = ({ children }) => {
  return (
    <View style={styles.container}>
        {/* <Topbar /> */}
        <View style={styles.contentContainer}>
            { children }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: '#f1f1f1',
        color: '#ffffff'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    }
});

export default Template