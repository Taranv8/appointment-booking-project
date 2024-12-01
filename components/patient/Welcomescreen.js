import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const WelcomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      id: "1",
      src: require("./1.jpg"),
      heading: "Insight",
      description:
        "It helps you see life differently, as it provides instant and scheduled consultations from a number of qualified advisors.",
    },
    {
      id: "2",
      src: require("./2.jpg"),
      heading: "Freedom of choice in your sessions",
      description:
        "You can book your consultations in the way that is convenient for you, whether it's through text, voice, or video.",
    },
    {
      id: "3",
      src: require("./3.jpg"),
      heading: "Available 24/7 to assist you",
      description:
        "Instant or scheduled consultations are available around the clock.",
    },
  ];

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / windowWidth);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Arabic Toggle */}
        <View style={styles.arabicToggle}>
          <Text style={styles.arabicText}>عربي</Text>
        </View>

        {/* Skip Button */}
        <TouchableOpacity
          style={styles.skipContainer}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Image Carousel */}
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={{ width: windowWidth, height: windowHeight }}>
              <Image source={item.src} style={styles.image} />
              <View style={styles.overlay}>
                <Text style={styles.heading}>{item.heading}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          )}
        />

        {/* Dots Indicator */}
        <View style={styles.dotContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex ? "#005153" : "#FFFFFF",
                },
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
    position: "relative",
  },
  arabicToggle: {
    position: "absolute",
    left: 20,
    top: 50,
    backgroundColor: "#043433",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 3, // Ensures it is above all other elements
  },
  arabicText: {
    fontFamily: "Cairo",
    fontSize: 15,
    color: "#FFFFFF",
    textAlign: "center",
  },
  skipContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 3, // Ensures it is above the image and overlay
  },
  skipText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    padding: 15,
    borderRadius: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 22,
  },
  dotContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default WelcomeScreen;
