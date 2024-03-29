import React from 'react'
import { View, Image, StyleSheet } from 'react-native';

const logoImage = require("../../assets/images/age-uk-logo-no-strap.png");

const Topbar = () => {
    return (
        <View style={styles.topbar}>
            <Image source={logoImage} style={{ width: 120, height: 60, resizeMode: "contain" }} />
        </View>
    );
}

const styles = StyleSheet.create({
    topbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: '40%',
        backgroundColor: '#ffffff',
        shadowColor: '#222222',
        paddingHorizontal: 10,
        paddingTop: 30,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 8,
        shadowOpacity: .2,
    }
})

export default Topbar