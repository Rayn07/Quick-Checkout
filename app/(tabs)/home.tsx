import { View, Text } from "react-native";
import React, { useState } from "react";
import homestyles from "../Styles/HomeStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto, Octicons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";

const home = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <SafeAreaView style={homestyles.homeContainer}>
      <View style={homestyles.homeTopBar}>
        <View>
          <Text style={homestyles.topBarText}>Username</Text>
        </View>
        <View style={homestyles.rewardNotifContainer}>
          <View style={homestyles.getRewardContainer}>
            <Text style={homestyles.getRewardText}>Get Reward</Text>
          </View>
          <View style={homestyles.notificationContainer}>
            <Octicons size={20} name="bell-fill" color="rgb(248,76,76)" />
          </View>
        </View>
      </View>
      <View style={homestyles.searchBarArea}>
        <View style={homestyles.searchIcon}>
          <Fontisto size={20} name="search" color={"#c1c1c1"} />
        </View>
        <GestureHandlerRootView>
          <View style={homestyles.searchBarContainer}>
            <TextInput
              style={homestyles.searchBarText}
              placeholder="Search"
              placeholderTextColor={"#c1c1c1"}
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
};

export default home;
