import { View, Text } from "react-native";
import React, { useState } from "react";
import homestyles from "../Styles/HomeStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto, Octicons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  TextInput,
  FlatList,
} from "react-native-gesture-handler";
import { Link } from "expo-router";

interface Shop {
  id: string;
  name: string;
  rating: number;
  category: string;
}

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);

  const shops: Shop[] = [
    { id: "1", name: "Coffee House", rating: 4.5, category: "Cafe" },
    { id: "2", name: "Pizza Place", rating: 4.2, category: "Restaurant" },
    { id: "3", name: "Book Store", rating: 4.8, category: "Retail" },
    { id: "4", name: "Bakery Fresh", rating: 4.6, category: "Bakery" },
    { id: "5", name: "Burger Joint", rating: 4.3, category: "Restaurant" },
    { id: "6", name: "Tech Store", rating: 4.4, category: "Electronics" },
    { id: "7", name: "Fashion Hub", rating: 4.1, category: "Clothing" },
    { id: "8", name: "Grocery Store", rating: 4.7, category: "Supermarket" },
  ];

  const handleSearch = (text: string): void => {
    setInputValue(text);
    const filtered = shops.filter(
      (shop) =>
        shop.name.toLowerCase().includes(text.toLowerCase()) ||
        shop.category.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredShops(text ? filtered : []);
  };

  const renderShop = ({ item }: { item: Shop }) => (
    <View style={homestyles.shopItem}>
      <Text style={homestyles.shopName}>{item.name}</Text>
      <View style={homestyles.shopDetails}>
        <Text style={homestyles.shopRating}>⭐ {item.rating}</Text>
        <Text style={homestyles.shopCategory}>{item.category}</Text>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          <View style={homestyles.searchBarContainer}>
            <TextInput
              style={homestyles.searchBarText}
              placeholder="Search shops or categories..."
              placeholderTextColor={"#c1c1c1"}
              value={inputValue}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {inputValue.length > 0 && (
          <FlatList
            data={filteredShops}
            renderItem={renderShop}
            keyExtractor={(item) => item.id}
            style={homestyles.shopList}
            ListEmptyComponent={
              <Text style={homestyles.noResults}>No shops found</Text>
            }
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
