import { View, Text } from "react-native";
import React from "react";
import appstyles from "../Styles/HomeStyles";

const scan = () => {
  return (
    <View style={appstyles.container}>
      <Text style={appstyles.text}>This scan</Text>
    </View>
  );
};

export default scan;
