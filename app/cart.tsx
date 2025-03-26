import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import homestyles from "./Styles/HomeStyles";
import { cartStyles } from "./Styles/CartStyles";
import api from "@/api";
import { NavigationProp, Product, RootStackScreens } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import productStyles from "./Styles/ProductStyles";

const storeName = "DMart";

const Cart: React.FC = () => {
	const navigation = useNavigation() as NavigationProp;

	const [cartItems, setCartItems] = useState<Product[]>([]);

	const { storeName, productData } = useLocalSearchParams();
	const products: Product[] = JSON.parse(productData as string);

	useEffect(() => {
		const initializeCart = () => {
			const finalProducts = products.filter((item: any) => item.quantity !== 0);
			setCartItems(finalProducts);
		};
		initializeCart();
	}, []);

	const checkoutCart = async () => {
		try {
			const res = await api.get(`/store/${storeName}/cart`);
			const cartId = res.data.cart._id;

			await api.get(`/payment/send-bill/${cartId}`);
			console.log("Bill Sent to User's Email");
		} catch (error) {
			console.error("Error while Checking Out Cart", error);
		}
	};

	const calculateTotal = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const updateQuantity = async (productName: string, addOrReduce: string) => {
		try {
			if (addOrReduce === "add") {
				const res = await api.post(`/store/${storeName}/add-product`, { productName });
				// const itemIndex = products.findIndex((item: Product) => item.name === productName);
				// console.log("PRODUCTS OLD", products);
				// products[itemIndex].quantity++;
				// setCartItems(products);
				// console.log("CART", cartItems);
				// console.log("PRODUCTS", products); // PRODUCT QUANTITY NEEDS TO BE INCREASED VISUALLY
			}
		} catch (error: any) {
			console.error("Error Increasing Quantity", error);
		}
		// setCartItems((currentItems) =>
		// 	currentItems
		// 		.map((item) =>
		// 			item.id === id
		// 				? { ...item, quantity: Math.max(0, item.quantity + change) }
		// 				: item
		// 		)
		// 		.filter((item) => item.quantity > 0)
		// );
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
								onPress={() => updateQuantity(item.name, "add")}
								style={cartStyles.quantityButton}
							>
								<Text style={cartStyles.quantityButtonText}>+</Text>
							</TouchableOpacity>
							<Text style={cartStyles.quantityText}>{item.quantity}</Text>
							<TouchableOpacity
								onPress={() => updateQuantity(item.name, "add")}
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
