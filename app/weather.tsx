import { View } from "react-native";
import WeatherCard from "@/components/WeatherCard";

export default function WeatherScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FAF7F0" }}>
      <WeatherCard />
    </View>
  );
}