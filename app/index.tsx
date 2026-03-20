import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MetaBoard</Text>
      <Text style={styles.subtitle}>What are we doing today?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/weather")}
      >
        <Text style={styles.buttonIcon}>🌤</Text>
        <Text style={styles.buttonText}>Weather</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/github")}
      >
        <Text style={styles.buttonIcon}>🐙</Text>
        <Text style={styles.buttonText}>GitHub Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/wiki")}
      >
        <Text style={styles.buttonIcon}>🔍</Text>
        <Text style={styles.buttonText}>Search a Person</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.button]}
        onPress={() => router.push("/exam")}
      >
        <Text style={styles.buttonIcon}>📅</Text>
        <Text style={[styles.buttonText, styles.buttonText]}>
          Exam Schedule
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#FAF7F0",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#1a1a1a",
    marginBottom: 4,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    marginBottom: 28,
    fontWeight: "500",
  },
  button: {
    width: "100%",
    padding: 18,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "#e8e8e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonIcon: {
    fontSize: 22,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  highlightText: {
    color: "#ffffff",
  },
});
