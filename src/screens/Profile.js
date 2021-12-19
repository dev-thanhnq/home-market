import React, {useEffect, useState} from 'react'
import {TouchableOpacity, StyleSheet, View, Image, ScrollView, ActivityIndicator} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import { Block } from "galio-framework";
// import Logo from '../components/Logo'
// import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { userValidator } from '../helpers/userValidator'
import { emailValidator } from "../helpers/emailValidator";
import { nameValidator } from "../helpers/nameValidator";
import { showMessage, hideMessage } from "react-native-flash-message";
import { passwordValidator } from '../helpers/passwordValidator'
import { confirmPassValidator } from '../helpers/confirmPassValidator.js'
import { passwordUpdateValidator } from "../helpers/passwordUpdateValidator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import { createStore } from 'redux'
import userReducers from "./../state/reducers/userReducers";
import {launchImageLibrary} from 'react-native-image-picker';

const store = createStore(userReducers)

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState({ value: '', error: '' })
  const [fullname, setFullname] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [newpassword, setNewpassword] = useState({ value: '', error: '' })
  const [confirm, setConfirm] = useState({ value: '', error: '' })
  const [address, setAddress] = useState({ value: '', error: '' })
  const [avatar, setAvatar] = useState({ value: ''})
  const [error, setError] = useState({ value: false})
  const [islogin, setIslogin] = useState({ value: false })
  const [name, setName] = useState({ value: ''})
  const [loading, setLoading] = useState({ value: false})

  useEffect(() => {
    loadData()
  }, [])

  const onUpdate = async () => {
    const emailError = emailValidator(email.value)
    const fullnameError = nameValidator(fullname.value)
    const phoneError = nameValidator(phone.value)
    const passwordError = passwordUpdateValidator(password.value)
    const newpasswordError = passwordUpdateValidator(newpassword.value)
    const confirmError = confirmPassValidator(confirm.value, newpassword.value)

    if (emailError || fullnameError || phoneError || newpasswordError || confirmError || passwordError) {
      setPassword({ ...password, error: passwordError })
      setEmail({ ...email, error: emailError })
      setFullname({ ...fullname, error: fullnameError })
      setPhone({ ...phone, error: phoneError })
      setNewpassword({ ...newpassword, error: newpasswordError })
      setConfirm({ ...confirm, error: confirmError })
      return
    }

    let formdata = new FormData();
    formdata.append("fullname", fullname.value)
    formdata.append("email", email.value)
    formdata.append("phone", phone.value)
    if (address.value) {
      formdata.append('address', address.value)
    }
    if (password.value) {
      formdata.append("current_password", password.value)
    }
    if (newpassword.value) {
      formdata.append("new_password", newpassword.value)
    }
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow',
      headers: {
        'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzOTgwMDIzOSwianRpIjoiMmE0NzVjMTMtMTNmOS00NGVlLWJjOGItNTJmMWMxYjVkOTk5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjMiLCJuYmYiOjE2Mzk4MDAyMzksImV4cCI6MTY0MDQwNTAzOX0.q_DEVnjaYw4-SRaCQGW7E9OvP9wYlzWfYr-dfkEoHtA'
      },
      body: formdata
    };
    setLoading({ value: true})
    await fetch("http://47.254.253.64:5000/api/user", requestOptions)
        .then(response => response.json())
        .then(result => {
          setLoading({ value: false})
          if (result.msg !== "Update successfully") {
            if (result.msg === "Password invalid") {
              setPassword( { ...password, error: 'Mật khẩu không chính xác'})
            }
            showMessage({
              message: "Cập nhật thất bại",
              type: "danger",
            });
          } else {
            console.log(result)
            setName({ value: result.user.username, error: '' })
            setEmail({ value: result.user.email, error: '' })
            setFullname({ value: result.user.fullname, error: '' })
            setPhone({ value: result.user.phone, error: '' })
            setAddress({ value: result.user.address, error: '' })
            setPassword( { value: "", error: ''})
            setNewpassword( { value: "", error: ''})
            setConfirm( { value: "", error: ''})
            showMessage({
              message: "Cập nhật thành công",
              type: "success",
            });
          }
        })
        .catch(error =>  {
              console.log('error', error)
              setLoading({ value: false})
            }
        );
  }

  const loadData = async () => {
    setLoading({ value: true})
    await fetch('http://47.254.253.64:5000/api/user',
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzOTgwMDIzOSwianRpIjoiMmE0NzVjMTMtMTNmOS00NGVlLWJjOGItNTJmMWMxYjVkOTk5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjMiLCJuYmYiOjE2Mzk4MDAyMzksImV4cCI6MTY0MDQwNTAzOX0.q_DEVnjaYw4-SRaCQGW7E9OvP9wYlzWfYr-dfkEoHtA'
          }
        })
        .then(res => res.json())
        .then(result => {
          setName({ value: result.username })
          setEmail({ value: result.email })
          setFullname({ value: result.fullname })
          setPhone({ value: result.phone })
          setAddress({ value: result.address })
          setAvatar({ value: result.avatar })
          console.log(result)
          setLoading({ value: false})
        })
        .catch(error => {
          setLoading({ value: false})
          console.log('Error', error.message);
          throw error;
        });
  }

  // const pickImage = () => {
  //   var option = {
  //     mediaType: 'photo'
  //   }
  //   launchImageLibrary(option, response => {
  //     console.log(response)
  //   }).then()
  // }

  const updateUser = (token) => {
    return {
      data: token,
      type: 'UPDATE_USER',
    }
  }

  const saveToken = async (token) => {
    console.log(token)
    // try {
    //     await AsyncStorage.setItem('token', token);
    // } catch (error) {
    //     console.log(error.message);
    // }
  };

  const getUserId = async () => {
    let token = '';
    try {
      token = await AsyncStorage.getItem('token') || 'none';
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return token;
  }

  return !loading.value ? (
      <Block  style={{marginTop: '27%', paddingLeft: 40, paddingRight: 40, textAlign: 'center'}}>
        <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        {
          (error.value) ? (
              <Text style={styles.loginError}>Tài khoản hoặc mật khẩu không chính xác</Text>
          ) : (
              <Text></Text>
          )
        }
        {
          (!avatar.value) ? (
            <Block style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                  style={{width: 100, height: 100, borderRadius: 50}}
                  source={require('../../assets/imgs/user.png')}
              />
            </Block>
          ) : (
            <Block style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                  style={{width: 100, height: 100, borderRadius: 50}}
                  source={{
                    uri: avatar.value,
                  }}
              />
            </Block>
          )
        }
          <Block style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.nameStyle}>
              {name.value}
            </Text>
          </Block>
        <TextInput
            label="Họ tên"
            returnKeyType="next"
            value={fullname.value}
            onChangeText={(text) => setFullname({ value: text, error: '' })}
            error={!!fullname.error}
            errorText={fullname.error}
            autoCapitalize="none"
        />
        <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
        />
        <TextInput
            label="Số điện thoại"
            returnKeyType="next"
            value={phone.value}
            onChangeText={(text) => setPhone({ value: text, error: '' })}
            error={!!phone.error}
            errorText={phone.error}
            autoCapitalize="none"
            keyboardType="numeric"
        />
        <TextInput
            label="Địa chỉ"
            returnKeyType="next"
            value={address.value}
            onChangeText={(text) => setAddress({ value: text, error: '' })}
            error={!!address.error}
            errorText={address.error}
            autoCapitalize="none"
        />
          <Text>
            Quản lý mật khẩu
          </Text>
        <TextInput
            label="Mật khẩu"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
        />
        <TextInput
            label="Mật khẩu mới"
            returnKeyType="done"
            value={newpassword.value}
            onChangeText={(text) => setNewpassword({ value: text, error: '' })}
            error={!!newpassword.error}
            errorText={newpassword.error}
            secureTextEntry
        />
        <TextInput
            label="Xác nhận mật khẩu"
            returnKeyType="done"
            value={confirm.value}
            onChangeText={(text) => setConfirm({ value: text, error: '' })}
            error={!!confirm.error}
            errorText={confirm.error}
            secureTextEntry
        />
        <Block style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
          <Button mode="contained" onPress={onUpdate} style={{ marginBottom: 40}}>
            Lưu
          </Button>
        </Block>
        </ScrollView>
      </Block>
  ) : (
      <Block style={styles.loading}>
        <ActivityIndicator size="large" color="#ff5722" />
      </Block>
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
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden'
  },
  nameStyle: {
    fontSize: 20
  },
  loading: {
    marginTop: '40%',
    height: 200
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.userReducers
  }
}

export default connect(mapStateToProps, null)(LoginScreen)
