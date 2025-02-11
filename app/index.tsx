import { Text, View, StyleSheet } from "react-native";
import {Stack} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Pressable} from "react-native";
import  { setShowSettings } from "@/features/gameSlice";
import Settings from "@/components/Settings";
import Question from "@/components/Question";

export default function Index() {

  const dispatch = useDispatch()
  const showSettings = useSelector(state => state.game.showSettings)
  const questions = useSelector(state => state.game.questions)
  const questionIndex = useSelector(state => state.game.questionIndex)


  return (

      <View style={style.container}>
        <Stack.Screen
          options={{
            headerRight: () => <Pressable onPress={() => dispatch(setShowSettings(true))}><Ionicons name="settings-sharp" size={24} color="black" /></Pressable>
          }}
        />
        {showSettings && <Settings showSettings={showSettings} onClose={() => dispatch(setShowSettings(false))} />}
        <Question />
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
