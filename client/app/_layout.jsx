import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const theme = {
    colors: {
      primary: "rgb(55, 106, 24)",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(183, 243, 144)",
      onPrimaryContainer: "rgb(9, 33, 0)",
      secondary: "rgb(118, 91, 0)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(255, 223, 148)",
      onSecondaryContainer: "rgb(37, 26, 0)",
      tertiary: "rgb(152, 71, 25)",
      onTertiary: "rgb(255, 255, 255)",
      tertiaryContainer: "rgb(255, 219, 204)",
      onTertiaryContainer: "rgb(53, 16, 0)",
      error: "rgb(186, 26, 26)",
      onError: "rgb(255, 255, 255)",
      errorContainer: "rgb(255, 218, 214)",
      onErrorContainer: "rgb(65, 0, 2)",
      background: "rgb(186, 235, 192)",
      onBackground: "rgb(26, 28, 24)",
      surface: "rgb(253, 253, 245)",
      onSurface: "rgb(26, 28, 24)",
      surfaceVariant: "rgb(224, 228, 214)",
      onSurfaceVariant: "rgb(67, 72, 62)",
      outline: "rgb(116, 121, 109)",
      outlineVariant: "rgb(196, 200, 187)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(47, 49, 44)",
      inverseOnSurface: "rgb(241, 241, 234)",
      inversePrimary: "rgb(156, 214, 119)",
      elevation: {
        level0: "transparent",
        level1: "rgb(243, 246, 234)",
        level2: "rgb(237, 241, 227)",
        level3: "rgb(231, 237, 221)",
        level4: "rgb(229, 235, 219)",
        level5: "rgb(225, 232, 214)",
      },
      surfaceDisabled: "rgba(26, 28, 24, 0.12)",
      onSurfaceDisabled: "rgba(26, 28, 24, 0.38)",
      backdrop: "rgba(45, 50, 41, 0.4)",
    },
  };

  return (
    <GestureHandlerRootView>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            headerTintColor: "#2c3e50",
          }}
        >
          <Stack.Screen
            name="index"
            options={{ headerTitle: "Login to continue" }}
          />
          <Stack.Screen
            name="contractBottom"
            options={{ headerTitle: "Contractor" }}
          />
          <Stack.Screen
            name="peopleBottom"
            options={{ headerTitle: "Issues" }}
          />
          <Stack.Screen name="gov" options={{ headerTitle: "Government" }} />
          <Stack.Screen name="ContractDesc" options={{ headerTitle: "" }} />
          <Stack.Screen
            name="TenderDesc"
            options={{ headerTitle: "Tender Details" }}
          />
          <Stack.Screen name="bid" options={{ headerTitle: "Bid Info" }} />
          <Stack.Screen name="bidauth" options={{ headerTitle: "" }} />
          <Stack.Screen
            name="Paymentdesc"
            options={{ headerTitle: "Payment Description" }}
          />
          <Stack.Screen
            name="peopleVote"
            options={{ headerTitle: "Cast Your Vote" }}
          />
          <Stack.Screen
            name="peopleIssue"
            options={{ headerTitle: "Raise your Greivances" }}
          />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
