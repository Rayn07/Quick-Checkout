import { View, Text } from "react-native";
import React from "react";
import appstyles from "../Styles/HomeStyles";

const merchant = () => {
  return (
    <View style={appstyles.container}>
      <Text style={appstyles.text}>This merchant</Text>
    </View>
  );
};

export default merchant;
