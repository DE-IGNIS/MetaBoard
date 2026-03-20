import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

interface OneCallApiResponse {
  lat: number;
  lon: number;
  timezone: string;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
  };
  hourly: {
    relative_humidity_2m: number[];
  };
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

const WeatherCard = () => {
  const [data, setData] = useState<OneCallApiResponse | null>(null);
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserLocation = async (): Promise<UserLocation | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Location permission denied");
        return null;
      }
      const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const coords = {
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      };
      setLocation(coords);
      return coords;
    } catch {
      setErrorMsg("Could not get location");
      return null;
    }
  };

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m&timezone=Asia/Kolkata`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      const json = await response.json();
      setData(json);
    } catch {
      setErrorMsg("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const coords = await getUserLocation();
      if (coords) await fetchWeather(coords.latitude, coords.longitude);
    };
    init();
  }, []);

  const getWeatherLabel = (code: number) => {
    if (code === 0) return "☀️ Clear Sky";
    if (code <= 2) return "⛅ Partly Cloudy";
    if (code === 3) return "☁️ Overcast";
    if (code === 45) return "🌫️ Foggy";
    if (code <= 67) return "🌧️ Rainy";
    if (code <= 77) return "🌨️ Snowy";
    return "🌩️ Stormy";
  };

  if (loading) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.stateText}>Fetching weather...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.stateContainer}>
        <Text style={[styles.stateText, { color: '#c53030' }]}>{errorMsg}</Text>
      </View>
    );
  }

  if (!data?.current_weather) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.stateText}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Today's Weather</Text>

      <View style={styles.tempBlock}>
        <Text style={styles.temperature}>
          {Math.round(data.current_weather.temperature)}°C
        </Text>
        <Text style={styles.weatherLabel}>
          {getWeatherLabel(data.current_weather.weathercode)}
        </Text>
        <Text style={styles.locationText}>📍 Current Location</Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailCard}>
          <Text style={styles.detailIcon}>💧</Text>
          <Text style={styles.detailValue}>
            {data.hourly.relative_humidity_2m[0]}%
          </Text>
          <Text style={styles.detailLabel}>Humidity</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailIcon}>🌬️</Text>
          <Text style={styles.detailValue}>
            {Math.round(data.current_weather.windspeed)} km/h
          </Text>
          <Text style={styles.detailLabel}>Wind</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailIcon}>🧭</Text>
          <Text style={styles.detailValue}>
            {data.current_weather.winddirection}°
          </Text>
          <Text style={styles.detailLabel}>Direction</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F0",   
    padding: 24,
    paddingTop: 60,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 32,
  },
  tempBlock: {
    alignItems: "center",
    backgroundColor: "#1DB954",   
    borderRadius: 24,
    paddingVertical: 40,
    marginBottom: 24,
    shadowColor: "#1DB954",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  temperature: {
    fontSize: 72,
    fontWeight: "900",
    color: "#ffffff",
  },
  weatherLabel: {
    fontSize: 20,
    color: "#e8ffe8",
    fontWeight: "600",
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#c8f5c8",
    marginTop: 8,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  detailCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e8e8e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  detailIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  detailLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  stateContainer: {
    flex: 1,
    backgroundColor: "#FAF7F0",
    justifyContent: "center",
    alignItems: "center",
  },
  stateText: {
    fontSize: 16,
    color: "#666",
  },
});

export default WeatherCard;