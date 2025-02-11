import {Text, View, StyleSheet, Modal} from "react-native";
import { categories } from "@/utilities/categories";
import Button from "@/components/Button";
import {Picker} from '@react-native-picker/picker';
import { useState, useEffect } from "react";
import { setNewGame } from "@/features/gameSlice";
import {useDispatch} from "react-redux";

type Props = {
  showSettings: boolean,
  onClose: () => void,
}

export default function Settings({ showSettings, onClose }: Props) {

  const [selectedCategory, setSelectedCategory] = useState(9);
  const dispatch = useDispatch()

  const saveSettings = async () => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=25&category=${selectedCategory}&type=multiple&encode=url3986`)
      type resultsType = {
        category: string,
        difficulty: string,
        question: string,
        incorrect_answers: string[],
        correct_answer: string
      }
      const { results } = await response.json()
      const questions = results.map((result: resultsType) => {
        const category = decodeURIComponent(result.category)
        const difficulty = result.difficulty.charAt(0).toUpperCase().concat(result.difficulty.substring(1))
        const question = decodeURIComponent(result.question)
        const incorrentAnswers = result.incorrect_answers.map((answer: string) => {
          return {
            response: decodeURIComponent(answer),
            correct: false
          }
        })
        const correntAnswer = {
          response: decodeURIComponent(result.correct_answer),
          correct: true
        }
        const choices = [...incorrentAnswers, correntAnswer]
        choices.sort(() => Math.random() - 0.5)
        return { category, difficulty, question, choices }
      })
      console.log(questions)
      dispatch(setNewGame(questions))
    } catch (error: any) {
      console.log(error)
    }
  }


  return (
    <Modal animationType="slide" transparent={false} visible={showSettings}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.pickerContainer}>
            <Text>Select Category</Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue: number) => setSelectedCategory(itemValue)}
            >
              {categories.map((category) =>
                <Picker.Item key={category.value} label={category.label} value={category.value}/>
              )}
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <Button label="Save" theme="primary" onPress={saveSettings}/>
            <Button label="Cancel" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {

  },
  content: {

  },
  pickerContainer: {

  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
    margin: 16
  }
});