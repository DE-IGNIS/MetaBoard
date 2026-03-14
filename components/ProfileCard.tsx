import { View, Text, Image, Linking, TouchableOpacity, ScrollView } from "react-native";

interface ProfileCardProps {
  avatar_url?: string;
  name?: string;
  login?: string;
  bio?: string;
  company?: string;
  blog?: string;
  location?: string;
  twitter_username?: string;
  followers?: number;
  following?: number;
  created_at?: string;
}

function ProfileCard({
  avatar_url,
  name,
  login,
  bio,
  company,
  blog,
  location,
  twitter_username,
  followers = 0,
  following = 0,
  created_at,
}: ProfileCardProps) {
  // Simple date formatting (no extra library needed)
  const joinedDate = created_at
    ? new Date(created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Unknown";

  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      {/* Avatar + Name section */}
      {avatar_url && (
        <Image
          source={{ uri: avatar_url }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "#ab8bff",
            marginBottom: 12,
          }}
        />
      )}

      <Text
        style={{
          color: "#ffffff",
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 4,
        }}
      >
        {name || login || "User"}
      </Text>

      {login && (
        <Text style={{ color: "#ab8bff", fontSize: 16, marginBottom: 16 }}>
          @{login}
        </Text>
      )}

      {/* Bio */}
      {bio && (
        <Text
          style={{
            color: "#e0e0e0",
            fontSize: 15,
            textAlign: "center",
            marginBottom: 20,
            lineHeight: 22,
            paddingHorizontal: 20,
          }}
        >
          {bio}
        </Text>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
          marginBottom: 24,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "gold", fontSize: 20, fontWeight: "600" }}>
            {followers.toLocaleString()}
          </Text>
          <Text style={{ color: "#aaa", fontSize: 13 }}>Followers</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "gold", fontSize: 20, fontWeight: "600" }}>
            {following.toLocaleString()}
          </Text>
          <Text style={{ color: "#aaa", fontSize: 13 }}>Following</Text>
        </View>
      </View>

      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        {location && <DetailLine label="Location" value={location} />}
        {company && <DetailLine label="Company" value={company} />}
        {blog && (
          <DetailLine
            label="Website"
            value={blog}
            onPress={() => {
              const url = blog.startsWith("http") ? blog : `https://${blog}`;
              Linking.openURL(url).catch(() => {});
            }}
          />
        )}
        {twitter_username && (
          <DetailLine
            label="Twitter"
            value={`@${twitter_username}`}
            onPress={() =>
              Linking.openURL(`https://twitter.com/${twitter_username}`)
            }
          />
        )}
        <DetailLine label="Joined" value={` ${joinedDate}`} />
      </View>
    </ScrollView>
  );
}

function DetailLine({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Text
        style={{
          color: onPress ? "#ab8bff" : "gold",
          fontSize: 15,
          marginVertical: 6,
          textDecorationLine: "none",
        }}
      >
        {label}: <Text style={{ color: "#ddd" }}>{value || "—"}</Text>
      </Text>
    </TouchableOpacity>
  );
}

export default ProfileCard;