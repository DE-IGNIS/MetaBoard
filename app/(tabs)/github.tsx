import { View, Text, TextInput, Image, ActivityIndicator } from "react-native";
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

const github = () => {
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#030014",
        padding: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "hsl(271, 51%, 38%)",
          borderRadius: 9999,
          paddingHorizontal: 16,
          paddingVertical: 12,
          padding: 10,
        }}
      >
        <Image
          style={{
            width: 18,
            height: 18,
          }}
          resizeMode="contain"
          tintColor="#ab8bff"
          source={icons.search}
        />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 6,
            color: "rgba(231, 180, 38, 0.96)",
          }}
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Enter Github username"
          placeholderTextColor="rgba(231 , 180 , 38 , 0.6)"
          // triggers a search function declared above
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {loading ? (
          // activity indicator is like a buffering wheel
          <ActivityIndicator size="large" color="#ab8bff" />
        ) : error ? (
          <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
        ) : userData ? (
          <ProfileCard {...userData} />
        ) : (
          <Text style={{ color: "gold", fontSize: 18, textAlign: "center" }}>
            Enter a GitHub username above{"\n"} and press search
          </Text>
        )}
      </View>
    </View>
  );
};

export default github;
