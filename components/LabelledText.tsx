import React, { FC } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export type LabelledTextProps = {
    label: string;
    value: string;
}

const LabelledText: FC<LabelledTextProps> = ({ label, value }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>
            {label}
        </Text>
        <Text>
            {value}
        </Text>
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
        marginBottom: 3
    }
});

export default LabelledText