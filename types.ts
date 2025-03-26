import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageSourcePropType } from "react-native";

export type StoreDetails = {
	_id: string;
	name: string;
	location: string;
	address: string;
};

export interface Product {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image: ImageSourcePropType;
}

export type RootStackScreens = {
	Login: undefined;
	Register: undefined;
	cart: {};
	store: {};
	"(tabs)": { screen: string; params: {} };
};

export type NavigationProp = NativeStackNavigationProp<RootStackScreens>;