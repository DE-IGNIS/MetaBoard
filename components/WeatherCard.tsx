import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { s, ms, vs } from "react-native-size-matters";

interface OneCallApiResponse {
  name: string;
  lat: number;
  lon: number;
  timezone: string;
  current_weather: {
    temperature: number;
    humidity: number;
    visibility: number;
    windspeed: number;
    winddirection: number;
    weathercode: number; // 0-clear 1-cloudy 2-partly cloudy 45-fog 61-light rain 3-overcast
  };
  hourly: {
    relative_humidity_2m: number[];
  };
}

interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

const WeatherCard = () => {
  const [data, setData] = useState<OneCallApiResponse | null>(null);
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<
    Location.PermissionStatus | string
  >("undetermined");
  const [loading, setLoading] = useState(true);

  const getUserLocation = async (): Promise<UserLocation | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return null;
      }
      const locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords: UserLocation = {
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
        accuracy: locationResult.coords.accuracy ?? undefined,
      };

      setLocation(coords);
      setErrorMsg(null);
      return coords;
    } catch (error) {
      setErrorMsg("Could not get location");
      console.log("Location error: ", error);
      return null;
    }
  };

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m&timezone=Asia/Kolkata`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather");
      const json = await response.json();
      setData(json);
    } catch (err) {
      setErrorMsg("Failed to fetch weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initWeather = async () => {
      const coords = await getUserLocation();
      if (coords) {
        await fetchWeather(coords.latitude, coords.longitude);
      }
    };
    initWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading weather...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {errorMsg}</Text>
      </View>
    );
  }

  if (!data?.current_weather) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No weather data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Current Weather</Text>

      <View style={styles.mainInfo}>
        <Text style={styles.temperature}>
          {Math.round(data.current_weather.temperature)}°
        </Text>
        <Text style={styles.location}>Your Location</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>
            {data.hourly.relative_humidity_2m[0]}%
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>
            {Math.round(data.current_weather.windspeed)} km/h
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Direction</Text>
          <Text style={styles.detailValue}>
            {data.current_weather.winddirection}°
          </Text>
        </View>
      </View>

      <Text style={styles.weatherCode}>
        Code: {data.current_weather.weathercode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: s(20),
    padding: s(20),
    margin: s(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  title: {
    fontSize: s(22),
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: vs(12),
  },

  mainInfo: {
    alignItems: "center",
    marginVertical: vs(8),
  },

  temperature: {
    fontSize: s(52),
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: vs(4),
  },

  location: {
    fontSize: s(16),
    color: "#666",
    fontWeight: "500",
  },

  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: vs(16),
    paddingTop: vs(16),
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },

  detailItem: {
    alignItems: "center",
    flex: 1,
  },

  detailLabel: {
    fontSize: s(13),
    color: "#777",
    marginBottom: vs(4),
  },

  detailValue: {
    fontSize: s(18),
    fontWeight: "600",
    color: "#222",
  },

  weatherCode: {
    fontSize: s(12),
    color: "#999",
    textAlign: "center",
    marginTop: vs(16),
    opacity: 0.7,
  },

  // States
  loadingContainer: {
    padding: s(30),
    alignItems: "center",
  },
  loadingText: {
    fontSize: s(16),
    color: "#666",
  },

  errorContainer: {
    padding: s(30),
    alignItems: "center",
    backgroundColor: "#fff5f5",
    borderRadius: s(12),
    margin: s(20),
  },
  errorText: {
    color: "#c53030",
    fontSize: s(16),
    textAlign: "center",
  },
});

export default WeatherCard;
