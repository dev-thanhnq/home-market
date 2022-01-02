import React, {useEffect, useState} from 'react'
import {TouchableOpacity, StyleSheet, View, ScrollView, ActivityIndicator, Dimensions} from 'react-native'
import {useIsFocused} from "@react-navigation/native";
import {Block, theme} from "galio-framework";
const { width } = Dimensions.get("screen");
import helpers from "../../store/helper";
import {showMessage} from "react-native-flash-message";

export default function ForgotPassword({ navigation }) {
    const isFocused = useIsFocused();
    useEffect(() => {
        helpers.updateState(updateUser())
        showMessage({
            message: "Đăng xuất thành công",
            type: "success",
        });
        navigation.navigate("Home")
    }, [isFocused])
    const updateUser = () => {
        return {
            data: '',
            type: 'UPDATE_USER',
        }
    }
    return (
        <Block flex center style={styles.home}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}
            >
                <Block flex style={styles.loading}>
                    <ActivityIndicator size="large" color="#ff5722" />
                </Block>
            </ScrollView>
        </Block>
    )
}

const styles = StyleSheet.create({
    home: {
        width: width
    },
    articles: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE,
        paddingHorizontal: 2,
        fontFamily: 'montserrat-regular'

    },
    loading: {
        marginTop: 50,
        height: 400
    }
})
