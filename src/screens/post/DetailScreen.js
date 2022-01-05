import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView, ActivityIndicator
} from 'react-native'
import {Ionicons, Feather, FontAwesome} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import call from 'react-native-phone-call'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import { createStore } from 'redux'
import userReducers from "../../state/reducers/userReducers";
import {showMessage} from "react-native-flash-message";
import ButtonCustom from '../../components/Button'
import {Block} from "galio-framework";
import { useIsFocused } from '@react-navigation/native';
import helpers from "../../store/helper";
import { config } from '../../../config'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const detailScreen = ({navigation, route}) => {
    const [data, setData] = useState("");
    const {idPost} = route.params;
    useEffect(() => {
        if (!helpers.getStore()) {
            navigation.navigate("Login")
        } else {
            loadData()
        }

    }, [])

    const loadData = async () => {
        await fetch( config() + 'post/' + idPost,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + helpers.getStore()
                }
            })
            .then(res => res.json())
            .then(data => {
                setData(data)
                console.log(data)
            })
            .catch(error => {
                console.log('Error', error.message);
                throw error;
            });
    }

   const makeCall =(number) => {
       const args = {
           number: number,
           prompt: true
       }
       call(args).catch(console.error)
   }

   const addToFollowList = async () => {
       await fetch( config() + 'post/follow/' + idPost,
           {
               method: 'POST',
               headers: {
                   'Authorization': 'Bearer ' + helpers.getStore()
               }
           })
           .then(res => res.json())
           .then(data => {
               if (data.msg === "done") {
                   loadData()
                   showMessage({
                       message: "Đã theo dõi bài viết",
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

    const deleteToFollowList = async () => {
        await fetch( config() + 'post/follow/' + idPost,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + helpers.getStore()
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.msg === "done") {
                    loadData()
                    showMessage({
                        message: "Đã bỏ theo dõi bài viết",
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

    return data instanceof Object ? (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <SliderBox images ={data.images} />
                <Text style={{fontWeight: 'bold', marginTop: 10, marginLeft: 10}}>
                    {data.title}
                </Text>
                <View style={styles.fakeLine}></View>
                {
                    (data.sold) ? (
                        <View>
                            <Text
                                style={{
                                    padding: 4,
                                    borderBottomColor: "red",
                                    borderBottomWidth: 1,
                                    borderTopWidth: 1,
                                    borderTopColor: "red",
                                    textAlign: 'center',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'red'
                                }}>Đã bán</Text>
                        </View>
                    ) : (
                        <View></View>
                    )
                }
                {
                    (data.followed) ? (
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Ionicons onPress={deleteToFollowList} name="heart" size={24} color="red" style={styles.iconDecoration}/>
                            <Text onPress={deleteToFollowList} style={{fontWeight: 'bold', width: windowWidth - 50, flexWrap: 'wrap', marginTop: 2}}>Đã theo dõi</Text>
                        </View>
                    ) : (
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Ionicons onPress={addToFollowList} name="heart-outline" size={24} color="red" style={styles.iconDecoration}/>
                            <Text onPress={addToFollowList} style={{fontWeight: 'bold', width: windowWidth - 50, flexWrap: 'wrap', marginTop: 2}}>Theo dõi</Text>
                        </View>
                    )
                }
                <View>
                    <Text style={{color: 'red', fontWeight: 'bold', marginLeft: 10}}>{data.price}tr/m2
                        - {data.acreage}m2 </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Feather name="map-pin" size={24} color="#0000FF" style={styles.iconDecoration}/>
                    <Text style={{fontWeight: 'bold', width: windowWidth - 50, flexWrap: 'wrap'}}>{data.address}</Text>
                </View>

                <TouchableOpacity
                    onPress={(id) => navigation.navigate('mapView',
                        {
                            latitude: data.latitude,
                            longitude: data.longitude,
                            title: data.title,
                        })}
                >
                    <Text style={{fontStyle: 'italic', marginLeft: 10, marginTop: 5, color:"red"}}>Xem bản đồ> </Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row'}}>
                    <Ionicons name="people-circle" size={24} color="#0000FF" style={styles.iconDecoration}/>
                    <Text style={styles.textDecoration}>{data.investor}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons name="bed-empty" size={24} color="#0000FF" style={styles.iconDecoration}/>
                    <Text style={styles.textDecoration}>Phòng Ngủ : {data.bedroom}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons name="toilet" size={24} color="#0000FF" style={styles.iconDecoration}/>
                    <Text style={styles.textDecoration}>Toilet : {data.toilet}</Text>
                </View>
                <View style={styles.fakeLine}></View>
                {
                    (data.sold) ? (
                        <View></View>
                    ) : (
                        <View style={styles.boxUser}>
                            <View style={{flexDirection: 'row', marginTop: 5}}>
                                <View>
                                    <Image source={{uri: data.user.avatar}} style={styles.iconUser}/>
                                </View>
                                <View style={{marginTop: 8, marginLeft: 10}}>
                                    <Text>{data.user.fullname}</Text>
                                    <Text>{data.user.phone}</Text>
                                    <Text>{data.user.email}</Text>
                                    <Text>{data.user.address}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }
                    <Text style={{marginBottom:10, fontWeight:"bold"}}>Thông tin chi tiết :</Text>
                    <Text style={{marginLeft:5, marginRight:5}}>{data.description}</Text>
                <View style={styles.fakeLine}></View>


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
    buttonDeatails: {
        height: 10,
        width: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    fakeLine: {
        width: windowWidth,
        height: 0.2,
        backgroundColor: 'gray',
        marginTop: 5,
        marginBottom: 5,
    },
    iconDecoration: {
        marginLeft: 5,
        marginRight: 5
    },
    textDecoration: {
        marginTop: 5,
        fontWeight: 'bold'
    },
    iconUser: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    boxUser: {
        flexDirection: 'row',
        // width: windowWidth * 0.9,
        height: 100,
        marginTop: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 5,
        marginBottom: 10,

    },
    iconCall: {
        marginLeft: windowWidth / 3,
        marginTop: 5
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
export default connect(mapStateToProps, null)(detailScreen);