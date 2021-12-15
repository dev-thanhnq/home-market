import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView
} from 'react-native'
import {Ionicons, Feather, FontAwesome} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import call from 'react-native-phone-call'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const detailScreen = ({navigation, route}) => {
    const [data, setData] = useState("");
    const {idPost} = route.params;
    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        await fetch('http://47.254.253.64:5000/api/post/' + idPost,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzOTQxOTA2MywianRpIjoiNjA0NzViZGMtMWFlZi00MTM3LTk2ZmUtZjc2MGFkNTBiOTM3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE2Mzk0MTkwNjMsImV4cCI6MTY0MDAyMzg2M30.p0kXiZWhJZ-N__-bmnuPYpGMJDGusnPqSIEqC5B9KX0'
                }
            })
            .then(res => res.json())
            .then(data => {
                setData(data)
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


    return data instanceof Object ? (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <SliderBox images ={data.images} />
                <Text style={{fontWeight: 'bold', marginTop: 10, marginLeft: 10}}>
                    {data.title}
                </Text>
                <View style={styles.fakeLine}></View>
                <View style={{marginTop: 10,}}>
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
                    {/*<TouchableOpacity*/}
                    {/*    style={{marginTop: 10, flexDirection: 'column'}}*/}
                    {/*    onPress={() => makeCall(data.user.phone)}*/}
                    {/*>*/}
                    {/*    <Feather name="phone" size={28} color="green" style={styles.iconCall}/>*/}

                    {/*</TouchableOpacity>*/}
                </View>
                    <Text style={{marginBottom:10, fontWeight:"bold"}}>Thông tin chi tiết :</Text>
                    <Text style={{marginLeft:5, marginRight:5}}>{data.description}</Text>
                <View style={styles.fakeLine}></View>


            </ScrollView>
        </SafeAreaView>
    ) : <Text>Fetching, Please wait....</Text>;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

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
        width: windowWidth * 0.95,
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
    }
});
export default detailScreen;