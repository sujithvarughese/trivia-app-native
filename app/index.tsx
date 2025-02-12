import {View, StyleSheet, Image} from "react-native";
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
import {useTheme} from "@react-navigation/native";

export default function Index() {

  const dispatch = useAppDispatch()
  const strikes = useAppSelector(state => state.game.strikes)

  useEffect(() => {
    if (strikes >= 3) {
      dispatch(setGameOver())
    }
  }, [strikes])
  
  return (
      <View style={style.container}>
        <Image
          source={require("../assets/images/pngtree-purple-technology-atmosphere-colorful-poster-banner-image_49591.jpg")}
          style={style.background}
          blurRadius={70}
        />

        <View style={style.infoBar}>
          <Strikes />
          <Score />
          <Pressable
            onPress={() => dispatch(setShowSettings(true))}>
            <Ionicons name="settings-sharp" size={24} color="#fefefe"/>
          </Pressable>
        </View>

        <Settings />
        <GameOver />

        <View style={style.questionContainer}>
          <Question />
        </View>

      </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  infoBar: {
    marginTop: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  questionContainer: {
    height: '100%',
  }
})
