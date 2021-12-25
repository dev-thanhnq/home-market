import { StyleSheet, Dimensions, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Block, theme, Text, Radio } from "galio-framework";
import { Card, Button } from "../components";
import nowTheme from "../constants/Theme";
const { width } = Dimensions.get("screen");
import React, {useState, Component, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';

const MyPost = () => {
    const isFocused = useIsFocused();
    const [homeData, setHomeData] = useState({value: []});
    const [page, setPage] = useState({value: 1});
    const [loading, setLoading] = useState({value: false});
    useEffect(() => {
        getHOmeData(1)
    }, [isFocused])

    const getHOmeData = async (currentPage) => {
        console.log("curentPage", currentPage)
        setLoading({value: true})
        await fetch("http://47.254.253.64:5000/api/posts/user?page" + currentPage.toString(),{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0MDI3Njg3MywianRpIjoiMjk4MTk5NTQtNjRjNC00Yzg0LTg2YWQtOGMzZDU0NjUzNTU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjMiLCJuYmYiOjE2NDAyNzY4NzMsImV4cCI6MTY0MDg4MTY3M30.c0l_LquPxzUlRYPBbCP48Zx_wBtfpQKZEcf0PF0Ub0g"
            }
        })
        .then(response => response.json())
        .then(result => {
            setHomeData({ value: result.posts })
            console.log('__________________________________posts')
            setLoading({value: false})
        })
        .catch(error => {
            console.log('error', error)
            setLoading({value: false})
        });
    }

    const footer = () => {
        return (
            <Block row middle>
                <Block row>
                    <Button
                        style={styles.pageButton}
                        onPress={handlePreviousPage}
                    >
                        back
                    </Button>
                </Block>
                <Block row>
                    <TextInput
                        textAlign={'center'}
                        color="black"
                        style={styles.searchPage}
                        placeholder="Số trang"
                        placeholderTextColor={'#8898AA'}
                        value={page.value.toString()}
                        keyboardType='numeric'
                    />
                </Block>
                <Block row>
                    <Button
                        style={styles.pageButton}
                        onPress={nextPage}
                    >
                        >
                    </Button>
                </Block>
            </Block>
        );
    };

    const nextPage = () => {
        setPage({ value: (page.value + 1)})
        getHOmeData(page.value + 1)
    }

    const handlePreviousPage = () => {
        if (page.value > 1) {
            setPage({ value: (page.value - 1)})
            getHOmeData(page.value - 1)
        }
    }

    return !loading.value ? (
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
                    {
                        (homeData.value.length !== 0) ? (
                            footer()
                        ) : (
                            <Text></Text>
                        )
                    }
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
        height: 400,
        textAlign: 'center'
    }
});

export default MyPost;
