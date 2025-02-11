import { Text, View, StyleSheet } from "react-native";
import {Stack} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Pressable} from "react-native";
import {setGameOver, setShowSettings} from "@/features/gameSlice";
import Settings from "@/components/Settings";
import Question from "@/components/Question";
import {useEffect} from "react";
import GameOver from "@/components/GameOver";
import Score from "@/components/Score";

export default function Index() {

  const dispatch = useDispatch()
  const showSettings = useSelector(state => state.game.showSettings)
  const strikes = useSelector(state => state.game.strikes)
  const gameOver = useSelector(state => state.game.gameOver)

  console.log(strikes)
  useEffect(() => {
    if (strikes >= 3) {
      dispatch(setGameOver())
    }
  }, [strikes])
  
  return (
      <View style={style.container}>
        <Stack.Screen
          options={{
            headerRight: () => <Pressable onPress={() => dispatch(setShowSettings(true))}><Ionicons name="settings-sharp" size={24} color="black" /></Pressable>
          }}
        />
        {showSettings && <Settings showSettings={showSettings} onClose={() => dispatch(setShowSettings(false))} />}
        {gameOver && <GameOver />}
        <Score />
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
