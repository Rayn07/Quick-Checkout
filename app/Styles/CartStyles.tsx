import { StyleSheet } from "react-native";

export const cartStyles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "rgb(248,76,76)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  quantityButtonText: {
    color: "white",
    fontSize: 16,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    height: "10%",
    padding: 24,
    backgroundColor: "rgb(248,76,76)",
  },
});

export default cartStyles;
