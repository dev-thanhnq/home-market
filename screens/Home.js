import React from "react";
import { StyleSheet, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button } from "../components";
import articles from "../constants/articles";
const { width } = Dimensions.get("screen");

class Home extends React.Component {
  state = {
    homeData: []
  }

  async componentDidMount() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    await fetch("http://47.254.253.64:5000/api/posts?filter=address:hà", requestOptions)
        .then(response => response.json())
        .then(result => {
          this.setState({
            homeData: result["posts"]
          })
          console.log('__________________________________')
        })
        .catch(error => console.log('error', error));
  }

  renderHomeData = (i) => {
    return (
        <Card item={this.state.homeData[i]} horizontal />
    );
  };

  render() {
    if (this.state.homeData.length > 0) {
      var payment = [];
      for (let i = 0; i < this.state.homeData.length; i++) {
        payment.push(this.renderHomeData(i))
      }
      return (
          <Block flex center style={styles.home}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}
            >
              <Block flex>
                {payment}
              </Block>
            </ScrollView>
          </Block>
      );
    } else {
      return (
          <ActivityIndicator size="large" />
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

  }
});

export default Home;
