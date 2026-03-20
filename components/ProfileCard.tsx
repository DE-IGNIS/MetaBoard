import { View, Text, Image, Linking, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

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
  const joinedDate = created_at
    ? new Date(created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Unknown";

  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{ alignItems: "center", paddingVertical: 24 }}
    >
      {avatar_url && (
        <Image
          source={{ uri: avatar_url }}
          style={styles.avatar}
        />
      )}

      <Text style={styles.name}>{name || login || "User"}</Text>

      {login && <Text style={styles.username}>@{login}</Text>}

      {bio && <Text style={styles.bio}>{bio}</Text>}

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{followers.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{following.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        {location && <DetailLine label="📍 Location" value={location} />}
        {company && <DetailLine label="🏢 Company" value={company} />}
        {blog && (
          <DetailLine
            label="🌐 Website"
            value={blog}
            onPress={() => {
              const url = blog.startsWith("http") ? blog : `https://${blog}`;
              Linking.openURL(url).catch(() => {});
            }}
          />
        )}
        {twitter_username && (
          <DetailLine
            label="🐦 Twitter"
            value={`@${twitter_username}`}
            onPress={() =>
              Linking.openURL(`https://twitter.com/${twitter_username}`)
            }
          />
        )}
        <DetailLine label="📅 Joined" value={joinedDate} />
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
    <TouchableOpacity disabled={!onPress} onPress={onPress} style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, onPress && styles.detailLink]}>
        {value || "—"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#1DB954",
    marginBottom: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  username: {
    fontSize: 15,
    color: "#1DB954",
    fontWeight: "600",
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    width: "90%",
    paddingVertical: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e8e8e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e8e8e0",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1DB954",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  detailsContainer: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e8e8e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0e8",
  },
  detailLabel: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },
  detailLink: {
    color: "#1DB954",
  },
});

export default ProfileCard;