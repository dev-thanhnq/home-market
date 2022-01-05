import React from 'react';
import {Easing, Animated, Dimensions} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
// screens
import Home from '../screens/post/Home';
import Pro from '../screens/Pro';
import Profile from '../screens/auth/Profile';
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import DetailScreens from "../screens/post/DetailScreen"
import FollowList from "../screens/post/FollowList"
import MyPost from "../screens/post/MyPost"
// drawer
import CustomDrawerContent from "./Menu";
// header for screens
import {Header, Icon} from '../components';
import {nowTheme, tabs} from "../constants";
import ForgotPassword from "../screens/auth/ForgotPassword";
import mapView from "../screens/MapView/MapView";
import Logout from "../screens/auth/Logout";
import CreatePost from "../screens/post/CreatePost";
import UpdatePost from "../screens/post/UpdatePost";

const {width} = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function LoginStack(props) {
    return (
        <Stack.Navigator initialRouteName="Login" mode="card" headerMode="screen">
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Đăng nhập"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            back
                            title="Đăng ký"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Quên mật khẩu"
                            navigation={navigation}
                            scene={scene}
                            back
                        />
                    ),
                    headerTransparent: true
                }}
            />

        </Stack.Navigator>
    );
}

function RegisterStack(props) {
    return (
        <Stack.Navigator initialRouteName="Register" mode="card" headerMode="screen">

        </Stack.Navigator>
    );
}

function ProfileStack(props) {
    return (
        <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Thông tin tài khoản"
                            search
                            options
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#FFFFFF"},
                    headerTransparent: true
                }}
            />
        </Stack.Navigator>
    );
}

function HomeStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Trang chủ"
                            search
                            options
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#FFFFFF"}
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            transparent
                            title="Đăng nhập"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name="Pro"
                component={Pro}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title=""
                            back
                            white
                            transparent
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    headerTransparent: true
                }}
            />
            <Stack.Screen name="Chi tiết bài viết"
                          component={DetailScreens}
            />
            <Stack.Screen name="mapView"
                          component={mapView}
            />
            <Stack.Screen name="FollowList"
                          component={FollowList}
                          options={{
                              header: ({navigation, scene}) => (
                                  <Header
                                      title=""
                                      back
                                      navigation={navigation}
                                      scene={scene}
                                  />
                              ),
                              cardStyle: {backgroundColor: "#FFFFFF"},
                              headerTransparent: true
                          }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Quên mật khẩu"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    headerTransparent: true
                }}
            />
        </Stack.Navigator>
    );
}

function FollowStack(props) {
    return (
        <Stack.Navigator initialRouteName="FollowList" mode="card" headerMode="screen">
            <Stack.Screen
                  name="FollowList"
                  component={FollowList}
                  options={{
                      header: ({navigation, scene}) => (
                          <Header
                              title="Bài viết theo dõi"
                              navigation={navigation}
                              scene={scene}
                          />
                      ),
                      cardStyle: {backgroundColor: "#FFFFFF"}
                      // headerTransparent: true
                  }}
            />
            <Stack.Screen name="Chi tiết bài viết"
                          component={DetailScreens}
            />
            <Stack.Screen name="mapView"
                          component={mapView}
            />
        </Stack.Navigator>
    );
}

function MyPostStack(props) {
    return (
        <Stack.Navigator initialRouteName="MyPost" mode="card" headerMode="screen">
            <Stack.Screen
                  name="MyPost"
                  component={MyPost}
                  options={{
                      header: ({navigation, scene}) => (
                          <Header
                              title="Bài viết của tôi"
                              navigation={navigation}
                              scene={scene}
                          />
                      ),
                      cardStyle: {backgroundColor: "#FFFFFF"}
                  }}
            />
            <Stack.Screen name="Chi tiết bài viết"
                          component={DetailScreens}
            />
            <Stack.Screen name="mapView"
                          component={mapView}
            />
            <Stack.Screen
                name="CreatePost"
                component={CreatePost}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Thêm mới bài viết"
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                }}


            />
            <Stack.Screen
                name="UpdatePost"
                component={UpdatePost}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Chỉnh sửa bài viết"
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                        ),
                }}
            />
        </Stack.Navigator>
    );
}

function LogoutStack(props) {
    return (
        <Stack.Navigator initialRouteName="Logout" mode="card" headerMode="screen">
            <Stack.Screen
                name="Logout"
                component={Logout}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Đang đăng xuất"
                            transparent
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function AppStack(props) {
    return (
        <Drawer.Navigator
            style={{flex: 1}}
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerStyle={{
                backgroundColor: nowTheme.COLORS.PRIMARY,
                width: width * 0.8
            }}
            drawerContentOptions={{
                activeTintcolor: nowTheme.COLORS.WHITE,
                inactiveTintColor: nowTheme.COLORS.WHITE,
                activeBackgroundColor: "transparent",
                itemStyle: {
                    width: width * 0.75,
                    backgroundColor: "transparent",
                    paddingVertical: 16,
                    paddingHorizonal: 12,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                },
                labelStyle: {
                    fontSize: 18,
                    marginLeft: 12,
                    fontWeight: "normal"
                }
            }}
            initialRouteName="Trang chủ"
        >
            <Drawer.Screen name="Trang chủ" component={HomeStack}/>
            <Drawer.Screen name="Bài viết theo dõi" component={FollowStack} />
            <Drawer.Screen name="Bài viết của tôi" component={MyPostStack} />
            <Drawer.Screen name="Tài khoản" component={ProfileStack}/>
            <Drawer.Screen name="Đăng nhập" component={LoginStack}/>
            <Drawer.Screen name="Đăng xuất" component={LogoutStack}/>
        </Drawer.Navigator>
    );
}

export default function OnboardingStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="none">
            <Stack.Screen name="App" component={AppStack}/>
        </Stack.Navigator>
    );
}

