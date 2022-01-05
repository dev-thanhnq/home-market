import { StyleSheet, Dimensions, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Block, theme, Text, Radio } from "galio-framework";
import { Card, Button } from "../../components";
import nowTheme from "../../constants/Theme";
const { width } = Dimensions.get("screen");
import React, {useState, Component, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import helpers from "../../store/helper";
import { config } from '../../../config'

const FollowList = () => {
    const isFocused = useIsFocused();
    const [homeData, setHomeData] = useState({value: []});
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getHOmeData()
    }, [isFocused])

    const getHOmeData = async () => {
        setLoading(true)
        await fetch( config() + "posts/follow",{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + helpers.getStore()
            }
        })
            .then(response => response.json())
            .then(result => {
                setHomeData({ value: result.followed_posts })
                setLoading(false)
                console.log('__________________________________follow-1')
            })
            .catch(error => {
                setLoading(false)
            });
    }

    return !loading ? (
        <Block flex center style={styles.home}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}
            >
                <Block flex>
                    {
                        (homeData.value.length > 0) ? (
                            homeData.value.map(item => <Card item={item} key={item.post_id} horizontal/>)
                        ) : (
                            <Block flex style={styles.loading}>
                                <Text style={{textAlign: 'center'}}>Không có dữ liệu</Text>

                            </Block>
                        )
                    }
                </Block>
            </ScrollView>
        </Block>
    ) : (
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
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    searchPage: {
        height: 40,
        width: width - 250,
        // marginHorizontal: 16,
        borderWidth: 0,
        borderRadius: 30,
        borderColor: nowTheme.COLORS.BORDER
    },
    pageButton: {
        width: 50,
        height: 40,
        flex: -1
    },
    filter: {
        height: 30,
        width: width - 300,
        // marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: nowTheme.COLORS.BORDER,
        marginLeft: 2,
        marginRight: 2
    },
    search: {
        height: 48,
        width: width - 120,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: nowTheme.COLORS.BORDER
    },
    searchBtn: {
        width: 50,
        height: 48,
        flex: -1,
        borderRadius: 30,
    },
    filterSearch: {
        height: 40,
        width: width - 270,
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: nowTheme.COLORS.BORDER
    },
    filterBtn: {
        height: 20,
        width: 100
    },
    loading: {
        marginTop: 50,
        height: 400
    }
});

export default FollowList;
