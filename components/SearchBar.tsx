// Includes Search Bar function
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VIP_COLORS } from "@/constants/theme";
import searchIcon from "../assets/images/search.png";

interface Props {
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  handleSearch?: () => void;
}

const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  handleSearch,
}: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleSearch} activeOpacity={0.7}>
          <Image source={searchIcon} style={styles.icon} tintColor={VIP_COLORS.greenApple} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={VIP_COLORS.textMuted}
          autoCorrect={false}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleSearch}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flexShrink: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: VIP_COLORS.cardSurface,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: VIP_COLORS.greenApple,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: VIP_COLORS.greenApple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  icon: {
    width: 18,
    height: 18,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: VIP_COLORS.textDark,
    fontSize: 15,
  },
});

export default SearchBar;
