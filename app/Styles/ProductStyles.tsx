import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const numColumns = 3;
const spacing = 8;
const cardWidth = (screenWidth - spacing * (numColumns + 1)) / numColumns;

const productStyles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  productsContainer: {
    paddingHorizontal: 8,
  },
  gridContainer: {
    paddingVertical: 8,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  productCard: {
    width: cardWidth,
    height: cardWidth * 1.5,
    backgroundColor: "white",
    borderRadius: 10,
    margin: spacing / 2,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
    justifyContent: "space-between",
  },
  productImage: {
    width: "100%",
    height: cardWidth * 0.6,
    borderRadius: 8,
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 2,
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 4,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
    display: "none",
  },
  addToCartButton: {
    backgroundColor: "rgb(248,76,76)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "100%",
    alignItems: "center",
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 4,
  },
  quantityButton: {
    backgroundColor: "rgb(248,76,76)",
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  bottomPadding: {
    height: 80,
  },
});

export default productStyles;
