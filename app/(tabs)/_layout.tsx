// import { Tabs } from "expo-router";
// import { Image, Text, View } from "react-native";
// import { StyleSheet } from "react-native";
// import { moderateScale, verticalScale } from "react-native-size-matters";
// import { icons } from "@/constants/icon";

// const TabIcon = ({
//   focused,
//   icon,
//   title,
// }: {
//   focused: boolean;
//   icon: any;
//   title: string;
// }) => {
//   return (
//     <View style={styles.iconContainer}>
//       <Image
//         source={icon}
//         style={[
//           styles.icon,
//           { tintColor: focused ? "#ead76c" : "#8A8A9E" }, // Gold active, muted inactive
//         ]}
//       />
//       <Text
//         style={[
//           styles.label,
//           {
//             opacity: focused ? 1 : 0.7,
//             color: focused ? "#FFFFFF" : "#8A8A9E",
//           },
//         ]}
//       >
//         {title}
//       </Text>
//     </View>
//   );
// };

// const _Layout = () => {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarItemStyle: {
//           flex: 1,
//           justifyContent: "center",
//           paddingVertical: verticalScale(8),
//           // minHeight: moderateScale(60),
//         },
//         tabBarStyle: {
//           ...styles.tabBar, 
//           bottom: verticalScale(30), 
//           shadowOffset: { width: 0, height: 4 },
//           shadowOpacity: 0.35,
//           shadowRadius: 16,
//           elevation: 16,
//         },
//         tabBarActiveBackgroundColor: "rgba(243, 206, 0, 0.2)",
//       }}
//     >
//       <Tabs.Screen
//         name="weather"
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon focused={focused} title="Weather" icon={icons.sun_logo} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="github"
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon
//               focused={focused}
//               title="Github"
//               icon={icons.github_logo}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// };

// const styles = StyleSheet.create({
//   iconContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: verticalScale(4),
//   },
//   icon: {
//     width: moderateScale(24),
//     height: moderateScale(24),
//   },
//   label: {
//     fontSize: moderateScale(10), // Readable size
//     fontWeight: "600",
//     marginTop: verticalScale(2),
//     letterSpacing: 0.3,
//   },
//   tabBar: {
//     backgroundColor: "rgba(15, 13, 35, 0.95)", // Semi-transparent dark
//     borderRadius: moderateScale(25),
//     marginHorizontal: moderateScale(16),
//     marginBottom: verticalScale(24),
//     height: moderateScale(68),
//     position: "absolute" as const,
//     borderWidth: 1,
//     borderColor: "rgba(255, 215, 0, 0.3)", // Gold border
//     backdropFilter: "blur(20px)", // iOS blur effect (use expo-blur)
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 12,
//   },
// });

// export default _Layout;

import { Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { icons } from "@/constants/icon";

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        style={[
          styles.icon,
          { tintColor: focused ? "#ebe5c2" : "#8A8A9E" },
        ]}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.label,
          { opacity: focused ? 1 : 0.7, color: focused ? "#FFFFFF" : "#8A8A9E" },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          flex: 1,                   
          justifyContent: "center",   
          alignItems: "center",
        },
        tabBarStyle: {
          ...styles.tabBar,
          bottom: verticalScale(32),   
          marginHorizontal: moderateScale(24),
        
          height: moderateScale(72),
        },
        tabBarActiveBackgroundColor: "rgba(243, 206, 0, 0.18)",
      }}
    >
      <Tabs.Screen
        name="weather"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Weather" icon={icons.sun_logo} />
          ),
        }}
      />
      <Tabs.Screen
        name="github"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Github" icon={icons.github_logo} />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: moderateScale(28),    
    height: moderateScale(28),
  },
  label: {
    fontSize: moderateScale(7),
    fontWeight: "600",
    marginTop: verticalScale(2),
    letterSpacing: 0.2,
  },
  tabBar: {
    backgroundColor: "rgba(15, 13, 35, 0.96)",
    borderRadius: moderateScale(28),

    marginBottom: 0,             
    height: moderateScale(68),
    position: "absolute" as const,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.25)",
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 16,
  },
});

export default _Layout;