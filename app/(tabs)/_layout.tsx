import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, Text, StatusBar } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import iconstyles from "../Styles/IconStyles";
import {
  FontAwesome6,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import appstyles from "../Styles/HomeStyles";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgb(248,76,76)" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2f2f2f",
          tabBarInactiveTintColor: "#929292",
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              transform: [{ scale: 1 }],
              transitionProperty: "none",
              WebkitTapHighlightColor: "transparent",
              backgroundColor: "white", // Set the tab bar background to white here
            },
            default: {
              backgroundColor: "white", // Set the tab bar background to white for default (Android)
            },
          }),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={30} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="merchant"
          options={{
            title: "Merchant",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 size={24} name="shop" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <View style={iconstyles.scanIcon}>
                <MaterialCommunityIcons
                  size={32}
                  name="line-scan"
                  color={"white"}
                />
                <View>
                  <Text style={iconstyles.scanText}>Scan</Text>
                </View>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color }) => (
              <Octicons size={26} name="history" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={30} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
