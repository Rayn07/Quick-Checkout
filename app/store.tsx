import { View, Text, Image, TouchableOpacity, Linking, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import storestyles from "./Styles/StoreStyles";
import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import homestyles from "./Styles/HomeStyles";
import { useLocalSearchParams } from "expo-router";
import productStyles from "./Styles/ProductStyles";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp, Product } from "@/types";
import api from "@/api";
import { ActivityIndicator } from "react-native";

const dmartImage = require("../assets/images/DMART.jpg");

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { storeDetails } = useLocalSearchParams();
	const store = JSON.parse(storeDetails as string);
	const storeName = store.name;

	const [quantity, setQuantity] = useState<number>(0);
	useEffect(() => {
		setQuantity(product.quantity);
	}, []);

	const increaseQuantity = async () => {
		try {
			await api.post(`/store/${storeName}/add-product`, {
				productName: product.name,
			});

			console.log("Product added to cart:", product.name);
			setQuantity((q) => q + 1);
		} catch (error: any) {
			const errorMsg = error.response.data.message;
			console.error(error.status, "Error Adding Item to Cart:", errorMsg);
		}
	};

	const decreaseQuantity = async () => {
		try {
			await api.post(`/store/${storeName}/remove-product`, {
				productName: product.name,
			});

			console.log("Product removed from cart:", product.name);
			setQuantity((q) => q + 1);
		} catch (error: any) {
			const errorMsg = error.response.data.message;
			console.error(error.status, "Error Removing Item from Cart:", errorMsg);
		}
	};

	return (
		<View style={productStyles.productCard}>
			<Image source={product.image} style={productStyles.productImage} />
			<Text style={productStyles.productName}>{product.name}</Text>
			<Text style={productStyles.productPrice}>{product.price}</Text>

			{quantity === 0 ? (
				<TouchableOpacity style={productStyles.addToCartButton} onPress={increaseQuantity}>
					<Text style={productStyles.addToCartText}>Add to Cart</Text>
				</TouchableOpacity>
			) : (
				<View style={productStyles.quantityControl}>
					<TouchableOpacity
						style={productStyles.quantityButton}
						onPress={decreaseQuantity}
					>
						<Text style={productStyles.quantityButtonText}>-</Text>
					</TouchableOpacity>
					<Text style={productStyles.quantityText}>{quantity}</Text>
					<TouchableOpacity
						style={productStyles.quantityButton}
						onPress={increaseQuantity}
					>
						<Text style={productStyles.quantityButtonText}>+</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

const Store: React.FC = () => {
	const navigation = useNavigation() as NavigationProp;

	const [productData, setProductData] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const { storeDetails, productDetails } = useLocalSearchParams();
	const store = JSON.parse(storeDetails as string);
	const storeName = store.name;
	const storeLocation = store.location;
	const storeAddress = store.address;

	useEffect(() => {
		updateProducts();
	}, []);

	const updateProducts = async (): Promise<Product[] | undefined> => {
		try {
			const products = JSON.parse(productDetails as string);
			const initialProductData: Product[] = products.map((product: any) => ({
				id: product._id,
				name: product.name,
				price: product.discountPrice,
				quantity: 0,
				image: require("../assets/images/coffee.jpg"),
			}));

			const productList = await fetchProductQuantity();
			const updatedProductData = initialProductData.map((product) => {
				const item = productList?.find((item: any) => item.product === product.id);
				return {
					...product,
					quantity: item ? item.quantity : 0,
				};
			});

			setProductData(updatedProductData);
			setIsLoading(false);

			return updatedProductData;
		} catch (error: any) {
			const errorMsg = error.response.data.message;
			console.error(error.status, "Error initializing products:", errorMsg);
			setIsLoading(false);
		}
	};

	const fetchProductQuantity = async () => {
		try {
			const res = await api.get(`/store/${storeName}/cart`);
			const productList = res.data.cart.productList;

			return productList;
		} catch (error: any) {
			const errorMsg = error.response.data.message;
			console.error(error.status, "Error Fetching Item Quantity:", errorMsg);
		}
	};

	const openCart = async () => {
		try {
			await api.get(`/store/${storeName}/cart`); //Initialize Cart Value

			const latestProductData = (await updateProducts()) as Product[];
			const productDataString = JSON.stringify(latestProductData);

			navigation.navigate("cart", { storeName, productData: productDataString });

			console.log("Successfully Opened Cart");
		} catch (error: any) {
			const errorMsg = error.response.data.message;
			console.error(error.status, "Error while opening cart:", errorMsg);
		}
	};

	const handleCall = (): void => {
		Linking.openURL("tel:1234567890");
	};

	const handleDirections = (): void => {
		Linking.openURL("https://maps.google.com");
	};

	const handleShare = () => {
		console.log("Share pressed");
	};

	const renderProductItem = ({ item }: { item: Product }): React.ReactElement => {
		return <ProductCard product={item} />;
	};

	return (
		<View style={storestyles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Image source={dmartImage} style={storestyles.storeImage} />

				<View style={storestyles.infoContainer}>
					<Text style={storestyles.storeName}>{storeName}</Text>
					<Text style={storestyles.category}>{storeLocation} • Open</Text>
					<Text style={storestyles.description}>{storeAddress}</Text>
				</View>

				<View style={storestyles.actionContainer}>
					<TouchableOpacity style={storestyles.actionButton} onPress={handleDirections}>
						<FontAwesome5 name="directions" size={30} />
						<Text style={storestyles.actionText}>Directions</Text>
					</TouchableOpacity>

					<TouchableOpacity style={storestyles.actionButton} onPress={handleCall}>
						<MaterialIcons name="phone-callback" size={30} />
						<Text style={storestyles.actionText}>Call</Text>
					</TouchableOpacity>

					<TouchableOpacity style={storestyles.actionButton} onPress={handleShare}>
						<FontAwesome6 name="share" size={30} />
						<Text style={storestyles.actionText}>Share</Text>
					</TouchableOpacity>
				</View>

				{/* Products Section */}
				<Text style={productStyles.sectionTitle}>Products</Text>

				<View style={productStyles.productsContainer}>
					{isLoading ? (
						<ActivityIndicator size="large" color="#0000ff" />
					) : (
						<FlatList
							data={productData}
							renderItem={renderProductItem}
							keyExtractor={(item) => item.id}
							numColumns={3}
							scrollEnabled={false}
							columnWrapperStyle={productStyles.row}
							contentContainerStyle={productStyles.gridContainer}
						/>
					)}
				</View>

				<View style={productStyles.bottomPadding} />
			</ScrollView>

			<View style={homestyles.checkoutBar}>
				<View style={homestyles.checkoutContent}>
					<View style={homestyles.checkoutButton}>
						<MaterialIcons name="shopping-cart" size={24} color="white" />
					</View>
					<View>
						<Text style={homestyles.storenameText}>{storeName}</Text>
					</View>
				</View>
				<TouchableOpacity style={homestyles.checkoutButtonContainer} onPress={openCart}>
					<Text style={homestyles.checkoutButtonText}>View Cart</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Store;
