import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView, ActivityIndicator,
    TextInput
} from 'react-native'
import {Ionicons, Feather, FontAwesome} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import call from 'react-native-phone-call'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import { createStore } from 'redux'
import userReducers from "./../../state/reducers/userReducers";
import {showMessage} from "react-native-flash-message";
import ButtonCustom from '../../components/Button'
import {Block} from "galio-framework";
import { useIsFocused } from '@react-navigation/native';
import helpers from "../../../src/store/helper";
import Input from "../../components/Input";
import nowTheme from "../../constants/Theme";
import district from "../../constants/district";
import investorList from "../../constants/investor";
import RNPickerSelect from "react-native-picker-select";

const width = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CreatePost = ({navigation}) => {
    const [title, setTitle] = useState({value: "", error: ""})
    const [address, setAddress] = useState({value: "", error: ""})
    const [price, setPrice] = useState({value: "", error: ""})
    const [acreage, setAcreage] = useState({value: "", error: ""})
    const [investor, setInvestor] = useState({value: "", error: ""})
    const [bedroom, setBedroom] = useState({value: "", error: ""})
    const [toilet, setToilet] = useState({value: "", error: ""})
    const [description, setDescription] = useState({value: "", error: ""})
    useEffect(() => {
        // if (!helpers.getStore()) {
        //     navigation.navigate("Login")
        // } else {
        //     loadData()
        // }

    }, [])

    const loadData = async () => {
        // await fetch('http://47.254.253.64:5000/api/post/' + idPost,
        //     {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': 'Bearer ' + helpers.getStore()
        //         }
        //     })
        //     .then(res => res.json())
        //     .then(data => {
        //         setData(data)
        //     })
        //     .catch(error => {
        //         console.log('Error', error.message);
        //         throw error;
        //     });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={{marginLeft: 20}}>Tiêu đề</Text>
                <Block row center>
                    <Input
                        right
                        color="black"
                        style={styles.search}
                        placeholder="Tiêu đề"
                        placeholderTextColor={'#8898AA'}
                        value={title.value}
                        onChangeText={(search) => setTitle({value: search, error: ""})}
                    />
                </Block>
                <Text style={{marginLeft: 20}}>Giá</Text>
                <Block row center>
                    <Input
                        right
                        color="black"
                        style={styles.search}
                        placeholder="Giá"
                        placeholderTextColor={'#8898AA'}
                        value={price.value}
                        keyboardType="numeric"
                        onChangeText={(search) => setPrice({value: search, error: ""})}
                    />
                </Block>
                <Text style={{marginLeft: 20}}>Nhà đầu tư</Text>
                <Block row style={{paddingLeft: 20}}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) => setInvestor({value: value, error: ''})}
                        items={investorList}
                        value={investor.value}
                        fixAndroidTouchableBug={true}
                    />
                </Block>
                <Text style={{marginLeft: 20}}>Địa chỉ</Text>
                <Block row style={{paddingLeft: 20}}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) => setAddress({value: value, error: ''})}
                        items={district}
                        value={address.value}
                        fixAndroidTouchableBug={true}
                    />
                </Block>
                <Text style={{marginLeft: 20}}>Diện tích</Text>
                <Block row center>
                    <Input
                        right
                        color="black"
                        style={styles.search}
                        placeholder="Diện tích"
                        placeholderTextColor={'#8898AA'}
                        value={acreage.value}
                        keyboardType="numeric"
                        onChangeText={(search) => setAcreage({value: search, error: ''})}
                    />
                </Block>
                <Text style={{marginLeft: 20}}>Phòng ngủ</Text>
                <Block row center>
                    <Input
                        right
                        color="black"
                        style={styles.search}
                        placeholder="Phòng tắm"
                        placeholderTextColor={'#8898AA'}
                        value={bedroom.value}
                        keyboardType="numeric"
                        onChangeText={(search) => setBedroom({value: search, error: ''})}
                    />
                </Block>
                <Text style={{marginLeft: 20}}>Toilet</Text>
                <Block row center>
                    <Input
                        right
                        color="black"
                        style={styles.search}
                        placeholder="Toilet"
                        placeholderTextColor={'#8898AA'}
                        value={toilet.value}
                        keyboardType="numeric"
                        onChangeText={(search) => setToilet({value: search, error: ''})}
                    />
                </Block>
                <Text style={{marginLeft: 20}}>Mô tả</Text>
                <Block row center>
                    <TextInput
                        style={styles.searchArea}
                        multiline = {true}
                        numberOfLines = {5}
                        value={description.value}
                        onChangeText={(value) => setDescription({value: value, error: ''})}
                    />
                </Block>
                <Block row middle>
                    <ButtonCustom>Dự đoán giá</ButtonCustom>
                    <ButtonCustom>Thêm mới</ButtonCustom>
                </Block>
            </ScrollView>
        </SafeAreaView>
    )
// : <Block flex style={styles.loading}>
//         <ActivityIndicator size="large" color="#ff5722" />
//     </Block>;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingRight: 10,
        paddingLeft: 10
    },
    search: {
        height: 48,
        width: width - 50,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: nowTheme.COLORS.BORDER,
    },
    searchArea: {
        height: 150,
        width: width - 50,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: nowTheme.COLORS.BORDER,
        padding: 10
    },
    loading: {
        marginTop: 50,
        height: 400
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.userReducers
    }
}
export default connect(mapStateToProps, null)(CreatePost);