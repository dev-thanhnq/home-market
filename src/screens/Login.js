import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
// import Logo from '../components/Logo'
// import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { userValidator } from '../helpers/userValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { connect } from "react-redux";
import { createStore } from 'redux'
import userReducers from "./../state/reducers/userReducers";

const store = createStore(userReducers)

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
    const [error, setError] = useState({ value: false})

  const onLoginPressed = () => {
    const usernameError = userValidator(username.value)
    const passwordError = passwordValidator(password.value)

    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError })
      setPassword({ ...password, error: passwordError })
      return
    }
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Dashboard' }],
    // })

      let formdata = new FormData();
      formdata.append("username", username.value)
      formdata.append("password", password.value)
      var requestOptions = {
          method: 'POST',
          redirect: 'follow',
          body: formdata
      };
      fetch("http://47.254.253.64:5000/api/auth/login", requestOptions)
          .then(response => response.json())
          .then(result => {
              if (result.error) {
                  setError({ value: true });
              } else {
                  store.dispatch(updateUser(result.user.username, result.user.avatar, result.token))
                  setUsername({value: ''});
                  setPassword({value: ''});
                  setError({ value: false });
                  navigation.goBack();
              }
          })
          .catch(error =>  {
                console.log('error', error)

              }
          );
  }

  const updateUser = (name, avatar, token) => {
      return {
          data:
              {
                  name: name,
                  avatar: avatar,
                  token: token
              },
          type: 'UPDATE_USER',
      }
  }

  return (
      <Background>
          {
              (error.value) ? (
                      <Text style={styles.loginError}>Tài khoản hoặc mật khẩu không chính xác</Text>
              ) : (
                  <Text></Text>
              )
          }
        <TextInput
            label="Tài khoản"
            returnKeyType="next"
            value={username.value}
            onChangeText={(text) => setUsername({ value: text, error: '' })}
            error={!!username.error}
            errorText={username.error}
            autoCapitalize="none"
        />
        <TextInput
            label="Mật khẩu"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgot}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onLoginPressed}>
          Đăng nhập
        </Button>
        <View style={styles.row}>
          <Text>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Đăng ký</Text>
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

const mapStateToProps = (state) => {
    return {
        user: state.userReducers
    }
}

export default connect(mapStateToProps, null)(LoginScreen)
