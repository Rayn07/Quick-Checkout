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
import { Link, useLocalSearchParams } from "expo-router";
import api from "@/api";
import { NavigationProp } from "@/types";
import { useNavigation } from "@react-navigation/native";

interface Store {
	_id: string;
	name: string;
	location: string;
}

const Home: React.FC = () => {
  const { email } = useLocalSearchParams();
	const navigation = useNavigation() as NavigationProp;

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

	const openStore = async (storeName: string) => {
		try {
			await api.get(`/store/${storeName}`);
			console.log(`Created cart for ${storeName}`);

			navigation.navigate("store");
		} catch (error) {
			console.error("Error while opening store", error);
		}
	};

	const renderStore = ({ item }: { item: Store }) => (
		<TouchableOpacity style={homestyles.shopItem} onPress={() => openStore(item.name)}>
			<Text style={homestyles.shopName}>{item.name} </Text>
			<Text style={homestyles.shopCategory}>{item.location}</Text>
			<View style={homestyles.shopDetails}>
				{/* <Text style={homestyles.shopCategory}>{item.location}</Text>
        <Text style={homestyles.shopRating}>⭐ {item.rating}</Text>
				<Text style={homestyles.shopCategory}>{item.category}</Text> */}
			</View>
		</TouchableOpacity>
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
							<Link href="/store" style={homestyles.getRewardText}>
								Get Reward
							</Link>
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
