/* eslint-disable import/no-unresolved */
// Includes Search Bar and Result
import {
  View,
  Text,
  Keyboard,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import wikipediaApi from "@/services/api";
import { VIP_COLORS } from "@/constants/theme";

type WikiPerson = {
  image: string;
  description: string;
  displayTitle: string;
  extract: string;
};
export default function WikiScreen() {
  const [name, setName] = useState<string>("");
  const [finalData, setFinalData] = useState<WikiPerson | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    Keyboard.dismiss();
    const result = await wikipediaApi(name);
    setFinalData(result);
    setLoading(false);
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FindVIP</Text>
        <Text style={styles.headerSubtitle}>Discover people on Wikipedia</Text>
        <View style={styles.searchBarWrapper}>
          <SearchBar
            placeholder="Search for a personality..."
            value={name}
            handleSearch={handleSearch}
            onChangeText={setName}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        keyboardShouldPersistTaps="handled"
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color={VIP_COLORS.greenApple}
            style={styles.loader}
          />
        ) : (
          finalData && (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.cardTextBlock}>
                  <Text style={styles.cardTitle}>{finalData.displayTitle}</Text>
                  {finalData.description ? (
                    <View style={styles.descriptionBadge}>
                      <Text style={styles.descriptionText}>
                        {finalData.description}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Image
                  source={{
                    uri: finalData.image,
                  }}
                  style={styles.cardImage}
                  onError={() => {
                    console.log("Image failed, using fallback");
                  }}
                />
              </View>
              <View style={styles.divider} />
              <Text style={styles.extractText}>{finalData.extract}</Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: VIP_COLORS.warmOffWhite,
  },
  header: {
    backgroundColor: VIP_COLORS.cardSurface,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: VIP_COLORS.borderLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: VIP_COLORS.greenAppleDark,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: VIP_COLORS.textMuted,
    marginTop: 2,
    marginBottom: 14,
  },
  searchBarWrapper: {},
  body: {
    padding: 20,
    paddingBottom: 40,
  },
  loader: {
    marginTop: 40,
  },
  card: {
    backgroundColor: VIP_COLORS.cardSurface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: VIP_COLORS.borderLight,
    shadowColor: VIP_COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: 12,
  },
  cardTextBlock: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: VIP_COLORS.greenAppleDark,
    marginBottom: 8,
    lineHeight: 28,
  },
  descriptionBadge: {
    alignSelf: "flex-start",
    backgroundColor: VIP_COLORS.greenAppleLight,
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: "600",
    color: VIP_COLORS.greenAppleDark,
  },
  cardImage: {
    width: 90,
    height: 110,
    borderRadius: 12,
    borderWidth: 1,
    // borderColor: VIP_COLORS.borderLight,
    borderColor: "red",
  },
  divider: {
    height: 1,
    backgroundColor: VIP_COLORS.borderLight,
    marginVertical: 14,
  },
  extractText: {
    fontSize: 14,
    color: VIP_COLORS.textMuted,
    lineHeight: 22,
  },
});
