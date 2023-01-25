import React from 'react'
import { Text, StyleSheet } from 'react-native'

const EmptyDate = () => {
  return (
    <Text style={styles.errorMessage}>
        There are no events on this day
    </Text>
  )
}

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 20,
        marginTop: 35
    }
});

export default EmptyDate