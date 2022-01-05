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
    TextInput,
    Modal,
    Alert
} from 'react-native'
import {Ionicons, Feather, FontAwesome} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import { SliderBox } from "react-native-image-slider-box";
import { connect } from "react-redux";
import {showMessage} from "react-native-flash-message";
import ButtonCustom from '../../components/Button'
import {Block} from "galio-framework";
import { useIsFocused } from '@react-navigation/native';
import helpers from "../../../src/store/helper";
import Input from "../../components/Input";
import nowTheme from "../../constants/Theme";
import district from "../../constants/district";
import investorList from "../../constants/investor";
import MapView, {Marker} from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from 'react-native-select-dropdown'
import Textarea from 'react-native-textarea';
import { config } from '../../../config'

const width = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const UpdatePost = ({navigation, route}) => {
    const {idPost} = route.params;
    const [title, setTitle] = useState({value: "", error: ""})
    const [address, setAddress] = useState({value: "", error: ""})
    const [price, setPrice] = useState({value: "", error: ""})
    const [acreage, setAcreage] = useState({value: "", error: ""})
    const [investor, setInvestor] = useState({value: "", error: ""})
    const [bedroom, setBedroom] = useState({value: "", error: ""})
    const [toilet, setToilet] = useState({value: "", error: ""})
    const [description, setDescription] = useState({value: "", error: ""})
    const [modal, setModal] = useState(false)
    const [place, setPlace] = useState({latitude: 20.97747606182431, longitude: 105.80145187675951})
    const [errorPlace, setErrorPlace] = useState("")
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [errorImages, setErrorImages] = useState("")
    const [pricePredict, setPricePredict] = useState({value: ""})
    useEffect(() => {
        if (!helpers.getStore()) {
            navigation.navigate("Login")
        } else {
            loadData()
        }

    }, [])

    const loadData = async () => {
        setLoading(true)
        await fetch( config() + 'post/' + idPost,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + helpers.getStore()
                }
            })
            .then(res => res.json())
            .then(data => {
                setTitle({value: data.title, error: ""})
                setPrice({value: data.price.toString(), error: ""})
                setAcreage({value: data.acreage.toString(), error: ""})
                setAddress({value: data.address, error: ""})
                setInvestor({value: data.investor, error: ""})
                setBedroom({value: data.bedroom.toString(), error: ""})
                setToilet({value: data.toilet.toString(), error: ""})
                setDescription({value: data.description, error: ""})
                setTitle({value: data.title, error: ""})
                setPlace({latitude: data.latitude, longitude: data.longitude})
                setPricePredict({value: ''})
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log('Error', error.message);
                throw error;
            });
    }

    const updatePost = async () => {
        if (!validate()) {
            setLoading(true)
            let formData = new FormData();
            formData.append('title', title.value)
            formData.append('price', parseInt(price.value))
            formData.append('investor', investor.value)
            formData.append('address', address.value)
            formData.append('acreage', parseInt(acreage.value))
            formData.append('description', description.value)
            formData.append('toilet', parseInt(toilet.value))
            formData.append('bedroom', parseInt(bedroom.value))
            formData.append('latitude', place.latitude)
            formData.append('longitude', place.longitude)
            let requestOptions = {
                method: 'PUT',
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + helpers.getStore()
                },
                body: formData
            };
            await fetch( config() + "post/" + idPost.toString(), requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    navigation.navigate("MyPost")
                    showMessage({
                        message: "Cập nhật thành công",
                        type: "success",
                    });
                })
                .catch(error =>  {
                        console.log('error', error)
                        setLoading(false)
                    showMessage({
                        message: "Cập nhật thất bại",
                        type: "error",
                    });
                    }
                );
        }
    }

    const predict = async () => {
        if (!validatePredict()) {
            setLoading(true)
            let formData = new FormData();
            formData.append('investor', investor.value)
            formData.append('address', address.value)
            formData.append('acreage', parseInt(acreage.value))
            formData.append('toilet', parseInt(toilet.value))
            formData.append('bedroom', parseInt(bedroom.value))
            formData.append('lat', place.latitude)
            formData.append('long', place.longitude)
            let requestOptions = {
                method: 'POST',
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + helpers.getStore()
                },
                body: formData
            };
            await fetch( config() + "posts/predict", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (!result.error) {
                        setPricePredict({value: result})
                        setLoading(false)
                    }

                })
                .catch(error =>  {
                        console.log('error', error)
                        setLoading(false)
                    }
                );
        }
    }

    const validate = () => {
        let error = false
        if (!title.value) {
            setTitle({value: title.value, error: "Tiêu đề không được bỏ trống"})
            error = true
        }
        if (!price.value) {
            setPrice({value: price.value, error: "Giá không được bỏ trống"})
            error = true
        }
        if (!investor.value) {
            setInvestor({value: investor.value, error: "Chọn nhà đầu tư"})
            error = true
        }
        if (!address.value) {
            setAddress({value: address.value, error: "Chọn quận huyện"})
            error = true
        }
        if (!place) {
            setErrorPlace('Chọn vị trí')
            error = true
        }
        if (!acreage.value) {
            setAcreage({value: acreage.value, error: "Diện tích không được bỏ trống"})
            error = true
        }
        if (!toilet.value) {
            setToilet({value: toilet.value, error: "Nhập số toilet"})
            error = true
        }
        if (!bedroom.value) {
            setBedroom({value: bedroom.value, error: "Nhập số phòng ngủ"})
            error = true
        }
        return error
    }

    const validatePredict = () => {
        let error = false
        if (!investor.value) {
            setInvestor({value: investor.value, error: "Chọn nhà đầu tư"})
            error = true
        }
        if (!address.value) {
            setAddress({value: address.value, error: "Chọn quận huyện"})
            error = true
        }
        if (!place) {
            setErrorPlace('Chọn vị trí')
            error = true
        }
        if (!acreage.value) {
            setAcreage({value: acreage.value, error: "Diện tích không được bỏ trống"})
            error = true
        }
        if (!toilet.value) {
            setToilet({value: toilet.value, error: "Nhập số toilet"})
            error = true
        }
        if (!bedroom.value) {
            setBedroom({value: bedroom.value, error: "Nhập số phòng ngủ"})
            error = true
        }
        return error
    }

    return !loading ? (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        Alert.alert("Chọn ví trí thành công.");
                    }}
                >
                    <View style={styles.mapModal}>
                        <View >
                            <MapView
                                onPress={(e) => {
                                    setPlace(e.nativeEvent.coordinate )
                                    console.log(e.nativeEvent)
                                    setErrorPlace("")
                                }

                                }
                                style={styles.map}
                                initialRegion={{
                                    latitude: 20.97747606182431,
                                    longitude: 105.80145187675951,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                {
                                    (place) ? (
                                        <MapView.Marker
                                            coordinate={place ? place : {latitude: 20.97747606182431,
                                                longitude: 105.80145187675951,}}
                                            description={"description"}
                                        />
                                    ) : (
                                        null
                                    )
                                }
                            </MapView>
                        </View>
                        <ButtonCustom onPress={() => setModal(!modal)}>Đóng</ButtonCustom>
                    </View>
                </Modal>
                <Text style={{marginLeft: 20, marginTop: 10}}>Tiêu đề</Text>
                <Block row center>
                    <Input
                        right
                        color="black"
                        style={styles.search}
                        placeholder="Tiêu đề"
                        placeholderTextColor={'#8898AA'}
                        value={title.value}
                        onChangeText={(search) => {
                            setTitle({value: search, error: ""})
                            title.error = ""
                        }}
                    />
                </Block>
                {
                    (title.error) ? (
                        <Text style={{marginLeft: 20, marginBottom: 10, color: 'red', fontSize: 12}}>{title.error}</Text>
                    ) : (null)
                }
                <Text style={{marginLeft: 20}}>Nhà đầu tư</Text>
                <Block row style={{paddingLeft: 20}}>
                    <SelectDropdown
                        data={investorList}
                        onSelect={(selectedItem, index) => {
                            investor.value = selectedItem
                            investor.error = ""
                        }}
                        defaultButtonText={investor.value}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                        buttonStyle={styles.dropdown1BtnStyle}
                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                        renderDropdownIcon={(isOpened) => {
                            return (
                                <FontAwesome
                                    name={isOpened ? "chevron-up" : "chevron-down"}
                                    color={"#444"}
                                    size={18}
                                />
                            );
                        }}
                        dropdownIconPosition={"right"}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        rowStyle={styles.dropdown1RowStyle}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                </Block>
                {
                    (investor.error) ? (
                        <Text style={{marginLeft: 20, marginBottom: 10, color: 'red', fontSize: 12}}>{investor.error}</Text>
                    ) : (null)
                }
                <Text style={{marginLeft: 20}}>Địa chỉ</Text>
                <Block row style={{paddingLeft: 20}}>
                    <SelectDropdown
                        data={district}
                        onSelect={(selectedItem, index) => {
                            address.value = selectedItem
                            address.error = ""
                        }}
                        defaultButtonText={address.value}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                        buttonStyle={styles.dropdown1BtnStyle}
                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                        renderDropdownIcon={(isOpened) => {
                            return (
                                <FontAwesome
                                    name={isOpened ? "chevron-up" : "chevron-down"}
                                    color={"#444"}
                                    size={18}
                                />
                            );
                        }}
                        dropdownIconPosition={"right"}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        rowStyle={styles.dropdown1RowStyle}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                </Block>
                {
                    (address.error) ? (
                        <Text style={{marginLeft: 20, marginBottom: 10, color: 'red', fontSize: 12}}>{address.error}</Text>
                    ) : (null)
                }
                {
                    (place) ? (
                        <Text onPress={() => setModal(!modal)} style={{marginLeft: 18, marginBottom: 10, marginTop: 7, color: "#0000FF"}}>
                            <Feather name="map-pin" size={16} color="#0000FF"/>
                            Đã chọn vị trí (Đổi vị trí)
                        </Text>
                    ) : (
                        <Text onPress={() => setModal(!modal)} style={{marginLeft: 18, marginBottom: 10, marginTop: 7, color: "#0000FF"}}>
                            <Feather name="map-pin" size={16} color="#0000FF"/>
                            Chọn vị trí>
                        </Text>
                    )

                }
                {
                    (errorPlace) ? (
                        <Text style={{marginLeft: 20, marginBottom: 10, color: 'red', fontSize: 12}}>{errorPlace}</Text>
                    ) : (null)
                }
                <Text style={{marginLeft: 20}}>Diện tích (m2)</Text>
                <Block row center>
                    <Input
                        right
                        color="black"
                        style={styles.search}
                        placeholder="Diện tích"
                        placeholderTextColor={'#8898AA'}
                        value={acreage.value}
                        keyboardType="numeric"
                        onChangeText={(search) => {
                            setAcreage({value: search, error: ''})
                            acreage.error = ""
                        }}
                    />
                </Block>
                {
                    (acreage.error) ? (
                        <Text style={{marginLeft: 20, marginBottom: 10, color: 'red', fontSize: 12}}>{acreage.error}</Text>
                    ) : (null)
                }
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
                        onChangeText={(search) => {
                            setBedroom({value: search, error: ''})
                            bedroom.error = ""
                        }}
                    />
                </Block>
                {
                    (bedroom.error) ? (
                        <Text style={{marginLeft: 20, marginBottom: 10, color: 'red', fontSize: 12}}>{bedroom.error}</Text>
                    ) : (null)
                }
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
                        onChangeText={(search) => {
                            setToilet({value: search, error: ''})
                            toilet.error = ""
                        }}
                    />
                </Block>
                {
                    (toilet.error) ? (
                        <Text style={{marginLeft: 20, marginBottom: 10, color: 'red', fontSize: 12}}>{toilet.error}</Text>
                    ) : (null)
                }
                <Text style={{marginLeft: 20}}>Mô tả</Text>
                <Block row center>
                    <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        onChangeText={(value) => description.value = value}
                        defaultValue={description.value}
                        maxLength={120}
                        placeholder={'Mô tả'}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                    />
                </Block>
                <Text style={{marginLeft: 20}}>
                    Giá (triệu)
                    {
                        (pricePredict.value) ? (
                            <Text> - Giá gợi ý: {pricePredict.value.toFixed(2)}</Text>
                        ) : (null)
                    }
                </Text>
                <Block row center>
                    <Input
                        right
                        color="black"
                        style={styles.search}
                        placeholder="Giá"
                        placeholderTextColor={'#8898AA'}
                        value={price.value}
                        keyboardType="numeric"
                        onChangeText={(search) => {
                            setPrice({value: search, error: ""})
                            price.error = ""
                        }}
                    />
                </Block>
                {
                    (price.error) ? (
                        <Text style={{marginLeft: 20, marginBottom: 10, color: 'red', fontSize: 12}}>{price.error}</Text>
                    ) : (null)
                }
                <Block row middle>
                    <ButtonCustom onPress={predict}>Dự đoán giá</ButtonCustom>
                    <ButtonCustom onPress={updatePost}>Lưu</ButtonCustom>
                </Block>
            </ScrollView>
        </SafeAreaView>
    ) : <Block flex style={styles.loading}>
        <ActivityIndicator size="large" color="#ff5722" />
    </Block>;
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
    },
    mapModal: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: windowHeight - 100,
    },
    map: {
        width: width,
        height: windowHeight - 200
    },
    dropdown1BtnStyle: {
        width: "95%",
        height: 48,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderRadius: 30,
        borderColor: nowTheme.COLORS.BORDER,
        marginTop: 7,
        marginBottom: 7,
    },
    dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
    dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdown1RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
    },
    dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },
    textareaContainer: {
        marginTop: 5,
        height: 180,
        padding: 5,
        width: width - 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: nowTheme.COLORS.BORDER,
    },
    deleteModal: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: windowHeight - 200
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.userReducers
    }
}
export default connect(mapStateToProps, null)(UpdatePost);