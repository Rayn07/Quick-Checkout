import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  ImageSourcePropType,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import storestyles from "./Styles/StoreStyles";
import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import homestyles from "./Styles/HomeStyles";
import { Link, useLocalSearchParams } from "expo-router";
import productStyles from "./Styles/ProductStyles";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp, StoreDetails } from "@/types";
import api from "@/api";

const dmartImage = require("../assets/images/DMART.jpg");

interface Product {
	id: string;
	name: string;
	price: string;
	image: ImageSourcePropType;
}

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { storeDetails } = useLocalSearchParams();
	const store = JSON.parse(storeDetails as string);
	const storeName = store.name;

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

	const [quantity, setQuantity] = useState<number>(0);

	useEffect(() => {
		fetchProductQuantity().then((productList) => {
			const item = productList.find((item: any) => {
				return item.product === product.id.toString();
			});
			setQuantity(item.quantity);
		});
	}, []);

	const increaseQuantity = async () => {
		try {
			await api.post(`/store/${storeName}/add-product`, {
				productName: product.name,
			});

			console.log("Product added to cart:", product.name);
			setQuantity(quantity + 1);
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
			setQuantity(quantity - 1);
		} catch (error: any) {
			const errorMsg = error.response.data.message;
			console.error(error.status, "Error Adding Item to Cart:", errorMsg);
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
	const { storeDetails, productDetails } = useLocalSearchParams();

	const store = JSON.parse(storeDetails as string);
	const storeName = store.name;
	const storeLocation = store.location;
	const storeAddress = store.address;

	const products = JSON.parse(productDetails as string);
	const productData: Product[] = products.map((product: any) => {
		return {
			id: product._id,
			name: product.name,
			price: product.discountPrice,
			image: require("../assets/images/coffee.jpg"),
		};
	});

	const handleCall = () => {
		Linking.openURL("tel:1234567890");
	};

	const handleDirections = () => {
		Linking.openURL("https://maps.google.com");
	};

	const handleShare = () => {
		console.log("Share pressed");
	};

	const renderProductItem = ({ item }: { item: Product }): React.ReactElement => {
		return <ProductCard product={item} />;
	};

	const openCart = async () => {
		try {
			const res = await api.get(`/store/${storeName}/cart`);
			const itemList = res.data.cart.productList;

			console.log("Store Name and Item List:", storeName, itemList);
			navigation.navigate("cart", { storeName: storeName, itemList: itemList });
			console.log("Successfully Opened Cart");
		} catch (error) {
			console.error("Error while opening cart", error);
		}
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
					<FlatList
						data={productData}
						renderItem={renderProductItem}
						keyExtractor={(item) => item.id}
						numColumns={3}
						scrollEnabled={false}
						columnWrapperStyle={productStyles.row}
						contentContainerStyle={productStyles.gridContainer}
					/>
				</View>

				<View style={productStyles.bottomPadding} />
			</ScrollView>

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

			<View style={homestyles.checkoutBar}>
				<View style={homestyles.checkoutContent}>
					<View style={homestyles.checkoutButton}>
						<MaterialIcons name="shopping-cart" size={24} color="white" />
					</View>
					<View>
						<Text style={homestyles.storenameText}>Store Name</Text>
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
