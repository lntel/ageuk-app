import React, { FC } from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'

export type LabelledSwitchProps = {
    label: string;
    value: boolean;
}

const LabelledSwitch: FC<LabelledSwitchProps> = ({ label, value,  }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Switch value={value} trackColor={{ true: '#23A2D1' }} />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5
    },
    label: {
        textTransform: 'uppercase',
        fontWeight: '600',
        color: '#23A2D1',
        fontSize: 13,
        marginBottom: 5
    }
});

export default LabelledSwitch