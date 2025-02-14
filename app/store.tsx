import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import React from "react";
import storestyles from "./Styles/StoreStyles";
import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const dmartImage = require("../assets/images/DMART.jpg");

const store = () => {
  const handleCall = () => {
    Linking.openURL("tel:1234567890");
  };

  const handleDirections = () => {
    Linking.openURL("https://maps.google.com");
  };

  const handleShare = () => {
    console.log("Share pressed");
  };

  return (
    <View style={storestyles.container}>
      <Image source={dmartImage} style={storestyles.storeImage} />

      <View style={storestyles.infoContainer}>
        <Text style={storestyles.storeName}>Store Name</Text>
        {/* <Text style={storestyles.storeRating}>⭐ 4.5 (619 reviews)</Text> */}
        <Text style={storestyles.category}>Supermarket • Open</Text>
        <Text style={storestyles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </View>

      <View style={storestyles.actionContainer}>
        <TouchableOpacity
          style={storestyles.actionButton}
          onPress={handleDirections}
        >
          <FontAwesome5 name="directions" size={30} />
          <Text style={storestyles.actionText}>Directions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={storestyles.actionButton} onPress={handleCall}>
          <MaterialIcons name="phone-callback" size={30} />
          <Text style={storestyles.actionText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={storestyles.actionButton}
          onPress={handleShare}
        >
          <FontAwesome6 name="share" size={30} />
          <Text style={storestyles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={storestyles.checkoutBar}>
        <View style={storestyles.checkoutContent}>
          <View style={storestyles.cartButton}>
            <Text style={storestyles.cartIcon}>🛒</Text>
          </View>
          <View>
            <Text style={storestyles.storenameText}>Store Name</Text>
            <Text style={storestyles.viewcartText}>View Cart</Text>
          </View>
        </View>
        <TouchableOpacity style={storestyles.checkoutButtonContainer}>
          <Text style={storestyles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default store;
