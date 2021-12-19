import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";
import Button from '../components/Button'

import nowTheme from "../constants/Theme";
import { connect } from "react-redux";
import { createStore } from 'redux'
import userReducers from "./../state/reducers/userReducers";

const store = createStore(userReducers)

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
  const screens = [
    "Trang chủ",
    "Tài khoản",
      "Đăng nhập"
  ];
  return (
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
          {
            (store.getState()) ? (
                null
            ) : (
                <Button title="Đăng xuất" onPress={(logout)}>Đăng xuất</Button>
            )
          }
        </ScrollView>
      </Block>
    </Block>
  );
}

const logout = ({navigation}) => {
  console.log('menu:', store.getState())
  store.dispatch(updateUser())
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
