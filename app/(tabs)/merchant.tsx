import { View, Text } from "react-native";
import React from "react";
import appstyles from "../Styles/HomeStyles";

const merchant = () => {
  return (
    <View style={appstyles.container}>
      <Text style={appstyles.text}>This Merchant</Text>
    </View>
  );
};

export default merchant;
