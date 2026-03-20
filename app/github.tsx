/* eslint-disable import/no-unresolved */
import { View, Text, TextInput, Image, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icon";
import ProfileCard from "@/components/ProfileCard";

interface User {
  name?: string;
  login?: string;
  followers?: number;
  company?: string;
  following?: number;
  location?: string;
  twitter_username?: string;
  blog?: string;
  created_at?: string;
  bio?: string;
  avatar_url?: string;
}

export default function GithubScreen() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const url = `https://api.github.com/users/${username.trim()}`;
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) throw new Error("User not found");
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image
          style={styles.searchIcon}
          resizeMode="contain"
          tintColor="#1DB954"
          source={icons.search}
        />
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Enter GitHub username"
          placeholderTextColor="#aaa"
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#1DB954" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : userData ? (
          <ProfileCard {...userData} />
        ) : (
          <Text style={styles.hintText}>
            Enter a GitHub username above{"\n"}and press search
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F0",
    padding: 20,
    paddingTop: 60,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#e8e8e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#1a1a1a",
    fontSize: 15,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#c53030",
    fontSize: 16,
    fontWeight: "600",
  },
  hintText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "500",
  },
});