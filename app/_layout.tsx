import { Stack } from "expo-router";
import {Provider, useDispatch} from "react-redux";
import {store} from "@/app/store";
import {ThemeProvider} from "@react-navigation/core";
import {useColorScheme} from "react-native";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";


export default function RootLayout() {

  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }} />
      </Provider>
    </ThemeProvider>

  )
}
