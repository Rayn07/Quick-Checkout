import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import homestyles from "../Styles/HomeStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto, Octicons, MaterialIcons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  TextInput,
  FlatList,
} from "react-native-gesture-handler";
import { Link } from "expo-router";
import api from "@/api";

interface Store {
	_id: string;
	name: string;
	location: string;
}

const Home: React.FC = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const [filteredStores, setFilteredStores] = useState<Store[]>([]);

	const fetchStores = async (text: string) => {
		try {
			setInputValue(text);
			const res = await api.get("/store/search", { params: { store: text } });
			console.log(res.data.storeDetails);
			const storeList = res.data.storeDetails;
			setFilteredStores(storeList);
		} catch (error) {
			console.error("Error while Fetching Stores", error);
		}
	};

	const renderStore = ({ item }: { item: Store }) => (
		<View style={homestyles.shopItem}>
			<Text style={homestyles.shopName}>{item.name}</Text>
			<View style={homestyles.shopDetails}>
				<Text style={homestyles.shopCategory}>{item.location}</Text>
				{/* <Text style={homestyles.shopRating}>⭐ {item.rating}</Text>
				<Text style={homestyles.shopCategory}>{item.category}</Text> */}
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
							placeholder="Search stores or categories..."
							placeholderTextColor={"#c1c1c1"}
							value={inputValue}
							onChangeText={fetchStores}
						/>
					</View>
				</View>

				{inputValue.length > 0 && (
					<FlatList
						data={filteredStores}
						renderItem={renderStore}
						keyExtractor={(item) => item._id}
						style={homestyles.shopList}
						ListEmptyComponent={
							<Text style={homestyles.noResults}>No stores found</Text>
						}
					/>
				)}
				<View style={homestyles.checkoutBar}>
					<View style={homestyles.checkoutContent}>
						<View style={homestyles.checkoutButton}>
							<MaterialIcons name="shopping-cart" size={24} color="white" />
						</View>
						<View>
							<Text style={homestyles.storenameText}>Store Name</Text>
							<Link href="/cart">
								<Text style={homestyles.viewcartText}>View Cart</Text>
							</Link>
						</View>
					</View>
					<View style={homestyles.checkoutButtonContainer}>
						<Link href="/cart">
							<Text style={homestyles.checkoutButtonText}>Checkout</Text>
						</Link>
					</View>
				</View>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default Home;
