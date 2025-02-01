import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import homestyles from "./Styles/HomeStyles";
import indexstyles from "./Styles/IndexStyles";

const logo = require("../assets/images/logo.png");

const app = () => {
  return (
    <View style={homestyles.container}>
      <Link href="/Login">
        <View style={indexstyles.logoContainer}>
          <View>
            <Image source={logo}></Image>
          </View>
          <View>
            <Text style={indexstyles.textContainer}>Snap.</Text>
          </View>
        </View>
      </Link>
    </View>
  );
};

export default app;
