import { View, Text } from "react-native";
import WeatherCard from "@/components/WeatherCard";

const Weather = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#030014", padding: 20 }}>
      <Text style={{ textAlign: "center", fontSize: 26 }}>☀️</Text>

      <Text style={{ textAlign: "center", fontSize: 22 }}>
        <WeatherCard />
      </Text>
    </View>
  );
};

export default Weather;
