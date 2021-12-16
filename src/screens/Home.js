import { StyleSheet, Dimensions, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Block, theme, Text, Radio } from "galio-framework";

import { Card, Button } from "../components";
import articles from "../constants/articles";
import district from "../constants/district";
import {View} from "react-native-reanimated";
import RNPickerSelect from 'react-native-picker-select';
import Icon from "../components/Icon";
import Input from "../components/Input";
import nowTheme from "../constants/Theme";
import {inlineStyles} from "react-native-svg";
const { width } = Dimensions.get("screen");
import React, { useState, Component } from 'react';

// const [page, setPage] = useState('1');
class Home extends React.Component {
  state = {
    homeData: [],
    page: '1',
    search: "",
    toilet: "",
    bedroom: "",
      filter: false,
      options: [
          { value: 'chocolate', label: 'Chocolate' },
          { value: 'strawberry', label: 'Strawberry' },
          { value: 'vanilla', label: 'Vanilla' }
      ],
      district: ''
  }

  async componentDidMount() {
    this.getHOmeData();
  }

  getHOmeData() {
      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
      };
      this.setState({
          homeData: []
      }, function () {
          // console.log("http://47.254.253.64:5000/api/posts?page="
          //     + this.state.page + "&filter=address:"
          //     + (this.state.district ? "" + this.state.district : "")
          //     + (this.state.toilet ? ",toilet:" + this.state.toilet : "")
          //     + (this.state.bedroom ? ",bedroom:" + this.state.bedroom : "")
          //     + (this.state.search ? "&search=" + this.state.search : ""))
          fetch("http://47.254.253.64:5000/api/posts?page="
              + this.state.page + "&filter=address:"
              + (this.state.district ? "" + this.state.district : "")
              + (this.state.toilet ? ",toilet:" + this.state.toilet : "")
              + (this.state.bedroom ? ",bedroom:" + this.state.bedroom : "")
              + (this.state.search ? "&search=" + this.state.search : ""), requestOptions)
              .then(response => response.json())
              .then(result => {
                  this.setState({
                      homeData: result["posts"]
                  })
                  console.log('__________________________________1')
              })
              .catch(error => console.log('error', error));
      })
  }

  renderHomeData = (item) => {
    return (
        <Card item={item} key={item.post_id} horizontal/>
    );
  };

  nextPage() {
      let page = parseInt(this.state.page) + 1
      this.setState({
          page: page.toString()
      }, function () {
          this.getHOmeData()
      })
  }

    previousPage() {
        let page = parseInt(this.state.page)
        if (page > 1) {
            page = page - 1
            this.setState({
                page: page.toString()
            }, function () {
                this.getHOmeData()
            })

        }
    }

    renderFooter = () => {
        var previousPage = '<'
        return (
            <Block row middle>
                <Block row>
                    <Button
                        style={styles.pageButton}
                        onPress={() => this.previousPage()}
                    >
                        {previousPage}
                    </Button>
                </Block>
                <Block row>
                    <TextInput
                        textAlign={'center'}
                        color="black"
                        style={styles.searchPage}
                        placeholder="Số trang"
                        placeholderTextColor={'#8898AA'}
                        value={this.state.page}
                        // onChangeText={(page) => this.setState({page})}
                        keyboardType='numeric'
                    />
                </Block>
                <Block row>
                    <Button
                        style={styles.pageButton}
                        onPress={() => this.nextPage()}
                    >
                        >
                    </Button>
                </Block>
            </Block>
        );
    };

  toggleFilter() {
      this.setState({filter: !this.state.filter})
  }

  renderFilter = () => {
      if (!this.state.filter) {
          return (
              <Button
                  style={styles.filterBtn}
                  onPress={() => this.toggleFilter()}
              >
                Bật bộ lọc
              </Button>
          )
      } else {
          return (
              <Block left>
                  <Block row left>
                      <Block row>
                          <Input
                              right
                              color="black"
                              style={styles.filterSearch}
                              placeholder="Toilet"
                              placeholderTextColor={'#8898AA'}
                              iconContent={
                                  <Icon size={16} color={theme.COLORS.MUTED} name="zoom-bold2x" family="NowExtra"/>
                              }
                              value={this.state.toilet}
                              onChangeText={(toilet) => this.setState({toilet})}
                              keyboardType="numeric"
                          />
                      </Block>
                      <Block row>
                          <Input
                              right
                              color="black"
                              style={styles.filterSearch}
                              placeholder="Phòng ngủ"
                              placeholderTextColor={'#8898AA'}
                              iconContent={
                                  <Icon size={16} color={theme.COLORS.MUTED} name="zoom-bold2x" family="NowExtra"/>
                              }
                              value={this.state.bedroom}
                              onChangeText={(bedroom) => this.setState({bedroom})}
                              keyboardType="numeric"
                          />
                      </Block>
                  </Block>
                  <Block style={{width: 200, paddingLeft: 14}}>
                      <RNPickerSelect
                          useNativeAndroidPickerStyle={false}
                          onValueChange={(value) => this.setState({district: value})}
                          items={district}
                          value={this.state.district}
                          fixAndroidTouchableBug={true}
                      />
                  </Block>
                  <Block middle>
                      <Button
                          style={styles.filterBtn}
                          onPress={() => this.toggleFilter()}
                      >
                          Tắt bộ lọc
                      </Button>
                  </Block>
              </Block>
          );
      }
  }

    renderSearch = () => {
        return (
            <Block middle>
                <Block row >
                    <Block row>
                        <Input
                            right
                            color="black"
                            style={styles.search}
                            placeholder="Nhập thông tin cần tìm kiếm"
                            placeholderTextColor={'#8898AA'}
                            // onFocus={() => {Keyboard.dismiss(); navigation.navigate('Pro')}}
                            iconContent={
                                <Icon size={16} color={theme.COLORS.MUTED} name="zoom-bold2x" family="NowExtra" />
                            }
                            value={this.state.search}
                            onChangeText={(search) => this.setState({search})}
                        />
                    </Block>
                    <Block row>
                        <Button
                            style={styles.searchBtn}
                            onPress={() => this.handleSearch()}
                        >
                            ->
                        </Button>
                    </Block>
                </Block>
            </Block>
        );
    };

  handleSearch() {
      let page = "1"
      this.setState({
          page: page
      }, function () {
          this.getHOmeData()
      })
  }

  render() {
    if (this.state.homeData.length > 0) {
      var payment = [];
      for (let i = 0; i < this.state.homeData.length; i++) {
        payment.push(this.renderHomeData(this.state.homeData[i]))
      }
      return (
          <Block flex center style={styles.home}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}
            >
                {this.renderSearch()}
                {this.renderFilter()}
              <Block flex>
                {payment}
              </Block>
                {this.renderFooter()}
            </ScrollView>
          </Block>
      );
    } else {
      return (
          <Block flex center style={styles.home}>
              <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.articles}
              >
                  {this.renderSearch()}
                  {this.renderFilter()}
                  <Block flex style={styles.loading}>
                      <ActivityIndicator size="large" color="#ff5722" />
                  </Block>
                  {this.renderFooter()}
              </ScrollView>
          </Block>
          // <Block style={styles.loading}>
          //   <ActivityIndicator size="large" color="#ff5722" />
          // </Block>
      )
    }
  }
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
        width: width - 240,
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

export default Home;
