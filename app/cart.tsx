import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import homestyles from "./Styles/HomeStyles";
import { cartStyles } from "./Styles/CartStyles";
import api from "@/api";
import { NavigationProp, Product } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

const Cart: React.FC = () => {
	const navigation = useNavigation() as NavigationProp;

	const [cartItems, setCartItems] = useState<Product[]>([]);

	const { storeName, productData } = useLocalSearchParams();
	const products: Product[] = JSON.parse(productData as string);

	useEffect(() => {
		const initializeCart = () => {
			const finalProducts = products.filter((item: Product) => item.quantity !== 0);
			setCartItems(finalProducts);
		};
		initializeCart();
	}, []);

	const checkoutCart = async () => {
		try {
			const res = await api.get(`/store/${storeName}/cart`);
			const cartId: string = res.data.cart._id;

			await api.get(`/payment/send-bill/${cartId}`);
			navigation.navigate("(tabs)", { screen: "home", params: {} });

			console.log("Bill Sent to User's Email");
		} catch (error: any) {
			const errorMsg = error.response.data.message;
			console.error(error.status, "Error While Checking Out Cart:", errorMsg);
		}
	};

	const calculateTotal = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const increaseQuantity = async (productName: string) => {
		try {
			await api.post(`/store/${storeName}/add-product`, { productName });

			const updatedCartItems = cartItems.map((item: Product) => {
				if (item.name === productName) {
					return { ...item, quantity: item.quantity + 1 };
				} else return item;
			});

			console.log("Product Quantity Increased:", productName);
			setCartItems(updatedCartItems);
		} catch (error: any) {
			const errorMsg = error.response.data.message;
			console.error(error.status, "Error Increasing Product Quantity:", errorMsg);
		}
	};

	const reduceQuantity = async (productName: string) => {
		try {
			await api.post(`/store/${storeName}/remove-product`, { productName });

			const updatedCartItems = cartItems
				.map((item: Product) => {
					if (item.name === productName) {
						return { ...item, quantity: item.quantity - 1 };
					} else return item;
				})
				.filter((item: Product) => item.quantity !== 0);

			console.log("Product Quantity Reduced:", productName);
			setCartItems(updatedCartItems);
		} catch (error: any) {
			const errorMsg = error.response.data.message;
			console.error(error.status, "Error Reducing Product Quantity:", errorMsg);
		}
	};

	const renderCartItem = (item: Product) => (
		<View key={item.id} style={homestyles.shopItem}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Image
					source={item.image}
					style={{ width: 60, height: 60, marginRight: 10, borderRadius: 10 }}
				/>
				<View style={{ flex: 1 }}>
					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						<Text style={homestyles.shopName}>{item.name}</Text>
						<Text style={homestyles.shopName}>
							₹{(item.price * item.quantity).toFixed(2)}
						</Text>
					</View>
					<View
						style={[
							homestyles.shopDetails,
							{
								justifyContent: "space-between",
								alignItems: "center",
							},
						]}
					>
						<Text>Price: ₹{item.price.toFixed(2)}</Text>
						<View style={cartStyles.quantityContainer}>
							<TouchableOpacity
								onPress={() => increaseQuantity(item.name)}
								style={cartStyles.quantityButton}
							>
								<Text style={cartStyles.quantityButtonText}>+</Text>
							</TouchableOpacity>
							<Text style={cartStyles.quantityText}>{item.quantity}</Text>
							<TouchableOpacity
								onPress={() => reduceQuantity(item.name)}
								style={cartStyles.quantityButton}
							>
								<Text style={cartStyles.quantityButtonText}>-</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={homestyles.homeContainer}>
			<View
				style={[
					cartStyles.topBar,
					{
						justifyContent: "flex-start",
						paddingHorizontal: 24,
					},
				]}
			>
				<Text style={homestyles.topBarText}>{storeName} Cart</Text>
			</View>

			<ScrollView
				style={{ width: "100%", paddingHorizontal: 16 }}
				contentContainerStyle={{ paddingBottom: 120 }}
				showsVerticalScrollIndicator={false}
			>
				{cartItems.map(renderCartItem)}
			</ScrollView>

			{cartItems.length > 0 && (
				<View
					style={{
						position: "absolute",
						bottom: 0,
						width: "100%",
						padding: 16,
						backgroundColor: "white",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginBottom: 10,
						}}
					>
						<Text style={homestyles.shopName}>Total:</Text>
						<Text style={homestyles.shopName}>₹{calculateTotal().toFixed(2)}</Text>
					</View>
					<TouchableOpacity
						style={{
							backgroundColor: "rgb(248,76,76)",
							padding: 15,
							borderRadius: 10,
							alignItems: "center",
							marginBottom: 20,
						}}
						onPress={checkoutCart}
					>
						<Text style={{ color: "white", fontWeight: "bold" }}>Checkout</Text>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	);
};

export default Cart;
