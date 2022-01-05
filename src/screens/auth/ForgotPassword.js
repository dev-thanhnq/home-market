import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
// import Logo from '../components/Logo'
// import Header from '../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { userValidator } from '../../helpers/userValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { emailValidator } from "../../helpers/emailValidator";
import {showMessage} from "react-native-flash-message";
import { config } from '../../../config'

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [error, setError] = useState({ value: false})

    const onLoginPressed = () => {
        const emailError = emailValidator(email.value)

        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }

        let formdata = new FormData();
        formdata.append("email", email.value)
        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            body: formdata
        };
        fetch( config() + "auth/forgot", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    setError({ value: true });
                } else {
                    setEmail({value: ''})
                    setError({ value: false });
                    showMessage({
                        message: "Vui lòng kiểm tra email",
                        type: "success",
                    });
                    navigation.navigate('Login')
                }
            })
            .catch(error =>  {

                }
            );
    }

    return (
        <Background>
            {
                (error.value) ? (
                    <Text style={styles.loginError}>Email không tồn tại</Text>
                ) : (
                    <Text></Text>
                )
            }
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
            />
            <Button mode="contained" onPress={onLoginPressed}>
                Gửi email
            </Button>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    loginError: {
        color: "#FF0000"
    }
})
