import React from 'react';
import {Block} from "galio-framework";
import {Easing, Animated, Dimensions} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
// screens
import Home from '../screens/Home';
import Pro from '../screens/Pro';
import Profile from '../screens/Profile';
import Components from '../screens/Components';
import Articles from '../screens/Articles';
import Onboarding from '../screens/Onboarding';
import SettingsScreen from '../screens/Settings';
import Login from "../screens/Login";
import Register from "../screens/Register";
import DetailScreens from "../screens/DetailScreens/DetailScreen"
import FollowList from "../screens/FollowList"
import MyPost from "../screens/MyPost"
// drawer
import CustomDrawerContent from "./Menu";
// header for screens
import {Header, Icon} from '../components';
import {nowTheme, tabs} from "../constants";
import ForgotPassword from "../screens/ForgotPassword";
import mapView from "../screens/MapView/MapView";

const {width} = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ComponentsStack(props) {
    return (
        <Stack.Navigator initialRouteName="Components" mode="card" headerMode="screen">
            <Stack.Screen name="Components" component={Components} options={{
                header: ({navigation, scene}) => (<Header title="Theo dõi" navigation={navigation} scene={scene}/>),
                backgroundColor: "#FFFFFF"
            }}/>
        </Stack.Navigator>
    );
}

function ArticlesStack(props) {
    return (
        <Stack.Navigator initialRouteName="Articles" mode="card" headerMode="screen">
            <Stack.Screen name="Articles" component={Articles} options={{
                header: ({navigation, scene}) => (<Header title="Articles" navigation={navigation} scene={scene}/>),
                backgroundColor: '#FFFFFF'
            }}/>
        </Stack.Navigator>
    );
}

function LoginStack(props) {
    return (
        <Stack.Navigator initialRouteName="Login" mode="card" headerMode="screen">
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
                name="Register"
                component={Register}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            transparent
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
                            transparent
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
                            title="Info"
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
            <Stack.Screen name="detailsScreen"
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
                                      white
                                      transparent
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
                            transparent
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
                              white
                              transparent
                              navigation={navigation}
                              scene={scene}
                          />
                      ),
                      // headerTransparent: true
                  }}
            />
            <Stack.Screen name="detailsScreen"
                          component={DetailScreens}
            />
        </Stack.Navigator>
    );
}

function MyPostStack(props) {
    return (
        <Stack.Navigator initialRouteName="MyPost" mode="card" headerMode="screen">
            <Stack.Screen
                  name="FollowList"
                  component={MyPost}
                  options={{
                      header: ({navigation, scene}) => (
                          <Header
                              title="Bài viết của tôi"
                              white
                              transparent
                              navigation={navigation}
                              scene={scene}
                          />
                      ),
                  }}
            />
            <Stack.Screen name="detailsScreen"
                          component={DetailScreens}
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
            <Drawer.Screen name="Tài khoản" component={ProfileStack}/>
            <Drawer.Screen name="Đăng nhập" component={LoginStack}/>
            <Drawer.Screen name="Bài viết theo dõi" component={FollowStack} />
            <Drawer.Screen name="Bài viết của tôi" component={MyPostStack} />
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

