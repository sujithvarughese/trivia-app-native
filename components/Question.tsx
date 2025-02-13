import {View, StyleSheet, ActivityIndicator} from "react-native";
import Text from "./Text"
import ResponseButton from "@/components/ResponseButton";
import { useState } from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import Button from "@/components/Button";
import {fetchAiResponse, fetchQuestions, setNextQuestion} from "@/features/gameSlice";


export default function Question() {

  const dispatch = useAppDispatch()
  const questions = useAppSelector(state => state.game.questions)
  const questionIndex = useAppSelector(state => state.game.questionIndex)
  const category = useAppSelector(state => state.game.category)
  const completed = useAppSelector(state => state.game.completed)
  const loading = useAppSelector(state => state.game.loading)

  const handleNextQuestion = () => {
    if (questionIndex >= questions.length) {
      dispatch(fetchQuestions(category))
    } else {
      dispatch(setNextQuestion())
    }
  }

  const handleAiResponse = () => {
    const correctAnswer = questions[questionIndex].choices.find((choice: { response: string, correct: boolean }) => choice.correct).response
    dispatch(fetchAiResponse(`${questions[questionIndex].question} ${correctAnswer}`))
  }

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
          />
        )}
      </View>

      {completed &&
      <View style={styles.actionContainer}>
          <Button onPress={handleAiResponse}>{loading ? <ActivityIndicator /> : <Text>AI Explain</Text>}</Button>
          <Button onPress={handleNextQuestion}><Text>Next</Text></Button>
      </View>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    gap: 32
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 24,
    marginHorizontal: 90,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})