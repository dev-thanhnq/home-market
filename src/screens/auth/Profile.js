import React, {useEffect, useState} from 'react'
import {TouchableOpacity, StyleSheet, View, Image, ScrollView, ActivityIndicator, Modal, Dimensions} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import { Block } from "galio-framework";
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { userValidator } from '../../helpers/userValidator'
import { emailValidator } from "../../helpers/emailValidator";
import { nameValidator } from "../../helpers/nameValidator";
import { showMessage, hideMessage } from "react-native-flash-message";
import { passwordValidator } from '../../helpers/passwordValidator'
import { confirmPassValidator } from '../../helpers/confirmPassValidator.js'
import { passwordUpdateValidator } from "../../helpers/passwordUpdateValidator";
import { phoneValidator } from '../../helpers/phoneValidator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import { createStore } from 'redux'
import userReducers from "../../state/reducers/userReducers";
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';
import helpers from "../../store/helper";
import { config } from '../../../config'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
  const [modal, setModal] = useState(false)
    const [passwordUser, setPasswordUser] = useState({ value: '', error: '' })
    const [passwordCon, setPasswordCon] = useState({ value: '', error: '' })
    const [username, setUsername] = useState({ value: '', error: '' })
    const isFocused = useIsFocused();

  useEffect(() => {
      if (!helpers.getStore()) {
          navigation.navigate("Home")
      } else {
          loadData()
      }
  }, [isFocused])

  const onUpdate = async () => {
    const emailError = emailValidator(email.value)
    const fullnameError = nameValidator(fullname.value)
    const phoneError = phoneValidator(phone.value)
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
    if (avatar.value) {
        formdata.append("avatar", avatar.value)
    }
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow',
      headers: {
        'Authorization': 'Bearer ' + helpers.getStore()
      },
      body: formdata
    };
    setLoading({ value: true})
    await fetch( config() + "user", requestOptions)
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
    await fetch( config() + 'user',
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + helpers.getStore()
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
          setLoading({ value: false})
        })
        .catch(error => {
          setLoading({ value: false})
          console.log('Error', error.message);
          throw error;
        });
  }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            // ImagePicker saves the taken photo to disk and returns a local URI to it
            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            // Upload the image using the fetch and FormData APIs
            let formdata = new FormData();
            // Assume "photo" is the name of the form field the server expects
            formdata.append('image_1', { uri: localUri, name: filename, type });

            var requestOptions = {
                method: 'POST',
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + helpers.getStore()
                },
                body: formdata
            };
            setLoading({ value: true})
            await fetch( config() + "image", requestOptions)
                .then(res => res.json())
                .then(result => {
                    if (result.images[0]) {
                        setAvatar({ value: result.images[0]});
                    }
                    setLoading({ value: false})
                })
                .catch(error => {
                    setLoading({ value: false})
                    console.log('Error', error.message);
                    throw error;
                });
        }
    };

    const updateUser = () => {
        return {
            data: '',
            type: 'UPDATE_USER',
        }
    }

  const deleteUser = async () => {
      const usernameError = userValidator(username.value)
      const passwordUserError = passwordValidator(passwordUser.value)
      const passwordConError = confirmPassValidator(passwordCon.value, passwordUser.value)

      if (usernameError || passwordConError || passwordUserError) {
          setUsername({ ...username, error: usernameError })
          setPasswordUser({ ...passwordUser, error: passwordUserError })
          setPasswordCon({ ...passwordCon, error: passwordConError })
          return
      }

      let formData = new FormData()
      formData.append('username', username.value)
      formData.append('current_password', passwordUser.value)
      formData.append('confirmed', passwordCon.value)

      let requestOptions = {
          method: 'DELETE',
          headers: {
              'Authorization': 'Bearer ' + helpers.getStore()
          },
          body: formData
      };

      await fetch( config() + 'user',requestOptions)
          .then(res => res.json())
          .then(data => {
              if (data.msg === "Account was deleted") {
                  helpers.updateState(updateUser())
                  setModal(false)
                  navigation.navigate("Home")
                  showMessage({
                      message: "Xóa bài tài khoản thành công",
                      type: "success",
                  });
              } else {
                  showMessage({
                      message: "Thất bại",
                      type: "danger",
                  });
              }
          })
          .catch(error => {
              console.log('Error', error.message);
              throw error;
          });
  }

  return !loading.value ? (
      <Block  style={{marginTop: '27%', paddingLeft: 40, paddingRight: 40, textAlign: 'center'}}>
        <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
            >
                <View style={styles.deleteModal}>
                    <Text>Dữ liệu sẽ không thể phục hồi, bạn có muốn tiếp tục?</Text>
                    <TextInput
                        label="Tài khoản"
                        returnKeyType="done"
                        value={username.value}
                        onChangeText={(text) => setUsername({ value: text, error: '' })}
                        error={!!username.error}
                        errorText={username.error}
                        // secureTextEntry
                    />
                    <TextInput
                        label="Mật khẩu"
                        returnKeyType="done"
                        value={passwordUser.value}
                        onChangeText={(text) => setPasswordUser({ value: text, error: '' })}
                        error={!!passwordUser.error}
                        errorText={passwordUser.error}
                        secureTextEntry
                    />
                    <TextInput
                        label="Xác nhận mật khẩu"
                        returnKeyType="done"
                        value={passwordCon.value}
                        onChangeText={(text) => setPasswordCon({ value: text, error: '' })}
                        error={!!passwordCon.error}
                        errorText={passwordCon.error}
                        secureTextEntry
                    />
                    <Block row middle>
                        <Button style={{width: 50, height: 30, backgroundColor: 'red'}} onPress={() => deleteUser()}>Xóa</Button>
                        <Button style={{width: 70, height: 30, backgroundColor: '#1C8FDB'}} onPress={() =>setModal(false)}>Hủy</Button>
                    </Block>
                </View>
            </Modal>
        {
          (!avatar.value) ? (
            <Block style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                  style={{width: 150, height: 150, borderRadius: 75}}
                  source={require('../../../assets/imgs/user.png')}
              />
            </Block>
          ) : (
            <Block style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                  style={{width: 150, height: 150, borderRadius: 75}}
                  source={{
                    uri: avatar.value,
                  }}
              />
            </Block>
          )
        }
            <Block style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text onPress={pickImage} style={{fontSize: 12, color: '#4285f4', marginBottom: 20}}>
                    Chọn ảnh
                </Text>
            </Block>
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
        <Block row middle>
          <Button mode="contained" onPress={() =>setModal(true)} style={{ marginBottom: 40, backgroundColor: 'red'}}>
            Xóa tài khoản
          </Button>
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
  },
    deleteModal: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth,
        height: windowHeight - 200,
        padding: 20
    },
})

const mapStateToProps = (state) => {
  return {
    user: state.userReducers
  }
}

export default connect(mapStateToProps, null)(LoginScreen)
