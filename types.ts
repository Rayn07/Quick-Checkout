import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type CartRouteParams = {
		storeName: string;
		itemList: Array<{
		id: string,
		name: string,
		price: number,
		quantity: number,
		image: any}>;
}

export type RootStackScreens = {
	Login: undefined;
	Register: undefined;
	cart: CartRouteParams;
	store: undefined;
	"(tabs)": { screen: string };
};

export type NavigationProp = NativeStackNavigationProp<RootStackScreens>;