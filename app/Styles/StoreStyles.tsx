import { StyleSheet } from "react-native";

const storestyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  storeImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  storeName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  storeRating: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "white",
    marginTop: 16,
  },
  actionButton: {
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    width: "28%",
  },
  iconText: {
    fontSize: 20,
    marginBottom: 4,
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    color: "black",
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
  cartButton: {
    backgroundColor: "rgb(248,76,76)",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cartIcon: {
    fontSize: 20,
    color: "white",
  },
  storenameText: {
    fontWeight: "bold",
  },
  viewcartText: {
    fontSize: 12,
    color: "blue",
  },
  checkoutButtonContainer: {
    backgroundColor: "rgb(248,76,76)",
    width: 128,
    height: 42,
    marginRight: -20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    padding: 8,
  },
  checkoutButtonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
});

export default storestyles;
