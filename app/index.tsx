import { Text, View, StyleSheet } from "react-native";
import {Stack} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Pressable} from "react-native";
import  { setShowSettings } from "@/features/gameSlice";
import Settings from "@/components/Settings";

export default function Index() {

  const dispatch = useDispatch()
  const showSettings = useSelector(state => state.game.showSettings)
  return (

      <View style={style.container}>
        <Stack.Screen
          options={{
            headerRight: () => <Pressable onPress={() => dispatch(setShowSettings(true))}><Ionicons name="settings-sharp" size={24} color="black" /></Pressable>
          }}
        />
        {showSettings && <Settings showSettings={showSettings} onClose={() => dispatch(setShowSettings(false))} />}
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
