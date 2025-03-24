import { StyleSheet } from "react-native";

const homestyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		height: "auto",
		width: "auto",
		backgroundColor: "white",
	},

	homeContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		height: "auto",
		width: "auto",
		backgroundColor: "white",
	},

	homeTopBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "center",
		width: "100%",
		height: "20%",
		padding: 24,
		backgroundColor: "rgb(248,76,76)",
	},

	topBarText: {
		color: "white",
		fontSize: 20,
		fontWeight: "semibold",
	},

	rewardNotifContainer: {
		flexDirection: "row",
		height: 36,
	},

	getRewardContainer: {
		borderRadius: 50,
		backgroundColor: "white",
		padding: 8,
		paddingLeft: 16,
		paddingRight: 16,
	},

	getRewardText: {
		color: "rgb(248,76,76)",
		fontWeight: "bold",
	},

	notificationContainer: {
		justifyContent: "center",
		alignContent: "center",
		borderRadius: 50,
		backgroundColor: "white",
		width: 36,
		height: 36,
		padding: 8,
		marginLeft: 16,
		paddingLeft: 9,
	},

	searchBarArea: {
		width: "90%",
		alignSelf: "center",
		flexDirection: "row",
		marginTop: 10,
	},

	searchIcon: {
		width: 40,
		height: 48,
		justifyContent: "center",
		backgroundColor: "white",
		padding: 10,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderColor: "#c1c1c1",
	},

	searchBarContainer: {
		flex: 1,
		height: 48,
		justifyContent: "center",
		backgroundColor: "white",
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderRightWidth: 1,
		borderColor: "#c1c1c1",
	},

	searchBarText: {
		color: "black",
		fontSize: 14,
		backgroundColor: "white",
		height: 48,
		width: "100%",
		paddingHorizontal: 10,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderRightWidth: 1,
		borderColor: "#c1c1c1",
	},

	text: {
		color: "black",
		fontSize: 42,
		fontWeight: "bold",
		textAlign: "center",
	},
	shopList: {
		width: "90%",
		alignSelf: "center",
	},
	shopItem: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		backgroundColor: "white",
	},
	shopName: {
		fontSize: 16,
		fontWeight: "bold",
	},
	shopDetails: {
		flexDirection: "row",
		marginTop: 5,
		gap: 10,
	},
	shopRating: {
		color: "#666",
	},
	shopCategory: {
		color: "#666",
	},
	noResults: {
		textAlign: "center",
		padding: 20,
		color: "#666",
	},
	checkoutBar: {
		width: "100%",
		height: 60,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 24,
		position: "absolute",
		bottom: 0,
		borderTopWidth: 0.25,
	},

	checkoutContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},

	storenameText: {
		fontWeight: "bold",
		fontSize: 16,
	},
	viewcartText: {
		fontSize: 12,
		color: "blue",
	},

	checkoutText: {
		color: "rgb(248,76,76)",
		fontSize: 18,
		fontWeight: "bold",
	},

	checkoutButton: {
		backgroundColor: "rgb(248,76,76)",
		borderRadius: 50,
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	checkoutButtonContainer: {
		backgroundColor: "rgb(248,76,76)",
		justifyContent: "center",
		width: 128,
		height: 42,
		marginRight: -20,
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 10,
		padding: 8,
	},
	checkoutButtonText: {
		fontWeight: "semibold",
		color: "white",
		fontSize: 16,
	},
});

export default homestyles;
