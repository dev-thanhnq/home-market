import React, {useState, Component, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
    Text
} from "react-native";
import { Block, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";
import Button from '../components/Button'

import nowTheme from "../constants/Theme";
import { connect } from "react-redux";
import { createStore } from 'redux'
import userReducers from "./../state/reducers/userReducers";
import {useIsFocused} from "@react-navigation/native";

// const store = createStore(userReducers)
import helpers from "../../src/store/helper";

const { width } = Dimensions.get("screen");

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const insets = useSafeArea();
  const isFocused = useIsFocused();
  const [token, setToken] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      setToken(helpers.getStore())
    });
    return unsubscribe;
  }, [navigation])
  const screens = [
    "Trang chủ",
    "Bài viết theo dõi",
    "Bài viết của tôi",
    "Tài khoản",
    "Đăng xuất"
  ];
  const screens2 = [
    "Trang chủ",
    "Đăng nhập"
  ];

  return token ? (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon
            name="align-left-22x"
            family="NowExtra"
            size={15}
            color={"white"}
          />
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
          <Block
            style={{ borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10}}
          />
        </Block>
        </ScrollView>
      </Block>
    </Block>
  ) : (
      <Block
          style={styles.container}
          forceInset={{ top: "always", horizontal: "never" }}
      >
        <Block style={styles.header}>
          <Image style={styles.logo} source={Images.Logo} />
          <Block right style={styles.headerIcon}>
            <Icon
                name="align-left-22x"
                family="NowExtra"
                size={15}
                color={"white"}
            />
          </Block>
        </Block>
        <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {screens2.map((item, index) => {
              return (
                  <DrawerCustomItem
                      title={item}
                      key={index}
                      navigation={navigation}
                      focused={state.index === index ? true : false}
                  />
              );
            })}
            <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
              <Block
                  style={{ borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10}}
              />
            </Block>
          </ScrollView>
        </Block>
      </Block>
  );
}

const logout = () => {
  helpers.updateState(updateUser())
  // navigation.navigate("Home")
}

const updateUser = () => {
  return {
    data: '',
    type: 'UPDATE_USER',
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center"
  },
  headerIcon: {
    marginTop: -20
  },
  logo: {
    height: 40,
    width: 37
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducers
  }
}

export default connect(mapStateToProps, null)(CustomDrawerContent);
