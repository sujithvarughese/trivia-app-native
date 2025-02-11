import {Text, View, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import ResponseButton from "@/components/ResponseButton";


export default function Question() {

  const questions = useSelector(state => state.game.questions)
  const questionIndex = useSelector(state => state.game.questionIndex)

  console.log(questions[questionIndex])

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{questions[questionIndex]?.category}</Text>
      <Text style={styles.difficulty}>{questions[questionIndex]?.difficulty}</Text>
      <Text style={styles.question}>{questions[questionIndex]?.question}</Text>
      <View>
        {questions[questionIndex]?.choices.map((choice, index) =>
          <ResponseButton key={index} label={choice.response} correct={choice.correct} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  category: {

  },
  difficulty: {

  },
  question: {
  }
})