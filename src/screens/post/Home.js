import { StyleSheet, Dimensions, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Block, theme, Text, Radio } from "galio-framework";

import { Card, Button } from "../../components";
import articles from "../../constants/articles";
import district from "../../constants/district";
import {View} from "react-native-reanimated";
// import RNPickerSelect from 'react-native-picker-select';
import Icon from "../../components/Icon";
import Input from "../../components/Input";
import nowTheme from "../../constants/Theme";
import {inlineStyles} from "react-native-svg";
const { width } = Dimensions.get("screen");
import React, { useState, Component } from 'react';
import {FontAwesome} from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { config } from '../../../config'

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
      district: '',
      totalPage: '1'
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
          fetch( config() + "posts?page="
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
                  this.setState({
                      totalPage: result.paging.total_page
                  })
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
                <Block row middle>
                    <Text style={{width: '60%', textAlign: 'center'}}>{this.state.page}/{this.state.totalPage}</Text>
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
                              placeholder="Bedroom"
                              placeholderTextColor={'#8898AA'}
                              value={this.state.bedroom}
                              onChangeText={(bedroom) => this.setState({bedroom})}
                              keyboardType="numeric"
                          />
                      </Block>
                  </Block>
                  <Block style={{width: 220, paddingLeft: 9}}>
                      <SelectDropdown
                          data={district}
                          onSelect={(selectedItem, index) => this.setState({district: selectedItem})}
                          defaultButtonText={"Chọn Quận, Huyện"}
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
                  <Block flex style={styles.loading}>
                      <ActivityIndicator size="large" color="#ff5722" />
                  </Block>
              </ScrollView>
          </Block>
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
        width: width - 110,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: nowTheme.COLORS.BORDER,
        marginRight: 3
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
        width: 100,
        marginLeft: 13
    },
    loading: {
      marginTop: 50,
      height: 400
    },
    dropdown1BtnStyle: {
        width: width - 270,
        height: 40,
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
});

export default Home;
