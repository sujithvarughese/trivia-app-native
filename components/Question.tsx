import { View, StyleSheet} from "react-native";
import Text from "./Text"
import ResponseButton from "@/components/ResponseButton";
import { useState } from "react";
import {useAppSelector} from "@/app/hooks";


export default function Question() {

  const questions = useAppSelector(state => state.game.questions)
  const questionIndex = useAppSelector(state => state.game.questionIndex)
  const [completed, setCompleted] = useState<boolean>(false)

  return (
    <View style={styles.container}>

      <View style={styles.questionContainer}>
        <Text style={styles.category}>{questions[questionIndex]?.category} - {questions[questionIndex]?.difficulty}</Text>
        <Text style={styles.question}>{questions[questionIndex]?.question}</Text>
      </View>

      <View style={styles.responseContainer}>
        {questions[questionIndex]?.choices.map((choice: any, index: number) =>
          <ResponseButton
            key={index}
            label={choice.response}
            difficulty={questions[questionIndex]?.difficulty}
            correct={choice.correct}
            completed={completed}
            setCompleted={setCompleted}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    gap: 32,
  },
  questionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  category: {

  },
  question: {
    fontSize: 18,
    fontWeight: "600",
  },
  responseContainer: {
    gap: 12
  }
})