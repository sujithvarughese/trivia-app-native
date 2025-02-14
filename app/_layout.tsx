import { Stack } from "expo-router";
import {Provider} from "react-redux";
import {store} from "@/app/store";
import {useColorScheme} from "react-native";


export default function RootLayout() {

  const colorScheme = useColorScheme()

  return (
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }} />
      </Provider>
  )
}
