import { View, StyleSheet } from "react-native";
import {Stack} from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Pressable} from "react-native";
import {setGameOver, setShowSettings} from "@/features/gameSlice";
import Settings from "@/components/Settings";
import Question from "@/components/Question";
import {useEffect} from "react";
import GameOver from "@/components/GameOver";
import Score from "@/components/Score";
import Strikes from "@/components/Strikes";
import {useAppDispatch, useAppSelector} from "@/app/hooks";

export default function Index() {

  const dispatch = useAppDispatch()
  const showSettings = useAppSelector(state => state.game.showSettings)
  const strikes = useAppSelector(state => state.game.strikes)
  const gameOver = useAppSelector(state => state.game.gameOver)

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

        <View style={style.infoBar}>
          <Strikes />
          <Score />
        </View>

        <View style={style.questionContainer}>
          <Question />
        </View>
      </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  infoBar: {
    backgroundColor: "#1d1f21",
    position: 'absolute',
    top: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  questionContainer: {
    height: '100%',
    marginTop: 180,
  }
})
