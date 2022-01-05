import {
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    TextInput,
    Alert, Modal,
    View
} from "react-native";
import { Block, theme, Text, Radio } from "galio-framework";
import { Card, Button } from "../../components";
import nowTheme from "../../constants/Theme";
const { width } = Dimensions.get("screen");
import React, {useState, Component, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import helpers from "../../store/helper";
import ButtonCustom from "../../components/Button";
import {showMessage} from "react-native-flash-message";
import { config } from '../../../config'

const windowHeight = Dimensions.get('window').height;
const MyPost = ({navigation}) => {
    const isFocused = useIsFocused();
    const [homeData, setHomeData] = useState({value: []});
    const [page, setPage] = useState({value: 1});
    const [loading, setLoading] = useState({value: false});
    const [modal, setModal] = useState(false)
    const [id, setId] = useState('')
    useEffect(() => {
        getHOmeData(1)
    }, [isFocused])

    const getHOmeData = async (currentPage) => {
        setLoading({value: true})
        await fetch( config() + "posts/user?page" + currentPage.toString(),{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + helpers.getStore()
            }
        })
        .then(response => response.json())
        .then(result => {
            setHomeData({ value: result.posts })
            setLoading({value: false})
        })
        .catch(error => {
            console.log('error', error)
            setLoading({value: false})
        });
    }

    const footer = () => {
        let back = '<'
        return (
            <Block row middle>
                <Block row>
                    <Button
                        style={styles.pageButton}
                        onPress={handlePreviousPage}
                    >
                        {back}
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

    const addPost = () => {
        navigation.navigate("CreatePost")
    }

    const openDelete = async (id) => {
        await setModal(true)
        setId(id)
    }

    const deletePost = async () => {
        await fetch( config() + 'post/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + helpers.getStore()
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.msg === "done") {
                    setModal(false)
                    getHOmeData(1)
                    showMessage({
                        message: "Xóa bài viết thành công",
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
            <Block flex center style={styles.home}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.articles}
                >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modal}
                    >
                        <View style={styles.deleteModal}>
                            <Text>Dữ liệu sẽ không thể phục hồi, bạn có muốn tiếp tục?</Text>
                            <Block row middle>
                                <Button style={{width: 50, height: 30, backgroundColor: 'red'}} onPress={() => deletePost()}>Xóa</Button>
                                <Button style={{width: 70, height: 30, backgroundColor: '#1C8FDB'}} onPress={() =>setModal(false)}>Hủy</Button>
                            </Block>
                        </View>
                    </Modal>
                    <Block row>
                        <Button onPress={() => navigation.navigate("CreatePost")}>Thêm mới</Button>
                    </Block>
                    <Block flex>
                        {
                            (homeData.value.length > 0) ? (
                                homeData.value.map((item, index) =>
                                    <Block key={index}>
                                        <Card item={item} key={item.post_id} horizontal/>
                                        <Block row middle key={index}>
                                            <Button key={index} style={{height: 30, backgroundColor: '#1C8FDB'}} onPress={() => navigation.navigate('UpdatePost',{idPost: item.post_id})}>Chỉnh sửa</Button>
                                            <Button key={item.time_upload} style={{height: 30, backgroundColor: 'red'}} onPress={() => openDelete(item.post_id)}>Xóa</Button>
                                        </Block>
                                    </Block>
                                )
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

export default MyPost;
