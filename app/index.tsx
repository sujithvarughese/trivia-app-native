import {View, StyleSheet, Image} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Pressable} from "react-native";
import {setShowSettings} from "@/features/gameSlice";
import Settings from "@/components/Settings";
import Question from "@/components/Question";
import GameOver from "@/components/GameOver";
import Score from "@/components/Score";
import Strikes from "@/components/Strikes";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import AiResponse from "@/components/aiResponse";

export default function Index() {

  const dispatch = useAppDispatch()
  const showSettings = useAppSelector(state => state.game.showSettings)
  const showGameOver = useAppSelector(state => state.game.showGameOver)
  const aiResponse = useAppSelector(state => state.game.aiResponse)

  return (
      <View style={[(showGameOver || showSettings || aiResponse) && { opacity: 0.5 }, style.container]}>
        <Image
          source={require("../assets/images/pngtree-purple-technology-atmosphere-colorful-poster-banner-image_49591.jpg")}
          style={style.background}
          blurRadius={70}
        />

        <View style={style.infoBar}>
          <Strikes />
          <View style={style.scoreContainer}>
            <Score />
          </View>

          <Pressable
            onPress={() => dispatch(setShowSettings(true))}>
            <Ionicons name="settings-sharp" size={28} color="#fefefe"/>
          </Pressable>
        </View>

        <Settings />
        <GameOver />
        <AiResponse />

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
    marginTop: 70,
    marginBottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scoreContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    marginTop: 'auto',
  },
  questionContainer: {
    height: '100%',
    paddingHorizontal: 10,
  },
})
