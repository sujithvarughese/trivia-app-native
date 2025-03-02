import {View, StyleSheet, Modal, Pressable} from "react-native";
import { categories } from "@/utilities/categories";
import Button from "@/components/Button";
import {Picker} from '@react-native-picker/picker';
import {fetchQuestions, setCategory, setDifficulty, setNewGame, setShowSettings} from "@/features/gameSlice";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import Text from "@/components/Text";


export default function Settings() {

  const category = useAppSelector(state => state.game.category)
  const difficulty = useAppSelector(state => state.game.difficulty)
  const showSettings = useAppSelector(state => state.game.showSettings)
  const dispatch = useAppDispatch()

  const saveSettings = () => {
      dispatch(fetchQuestions({ category, difficulty }))
      dispatch(setNewGame())
  }

  return (
    <Modal animationType="slide" transparent={true} visible={showSettings}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerTitle}>Select Category</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue: number) => dispatch(setCategory(itemValue))}
          >
            {categories.map((category) =>
              <Picker.Item
                color="#fff"
                key={category.value}
                label={category.label}
                value={category.value}
              />
            )}
          </Picker>
        </View>
        {/*
        <View style={styles.difficultyContainer}>
          <Pressable style={[styles.difficultyButton, difficulty === "easy" && styles.difficultySelected]} onPress={() => dispatch(setDifficulty("easy"))}><Text>Easy</Text></Pressable>
          <Pressable style={[styles.difficultyButton, difficulty === "medium" && styles.difficultySelected]} onPress={() => dispatch(setDifficulty("medium"))}><Text>Medium</Text></Pressable>
          <Pressable style={[styles.difficultyButton, difficulty === "hard" && styles.difficultySelected]} onPress={() => dispatch(setDifficulty("hard"))}><Text>Hard</Text></Pressable>
          <Pressable style={[styles.difficultyButton, difficulty === "random" && styles.difficultySelected]} onPress={() => dispatch(setDifficulty("random"))}><Text>Random</Text></Pressable>
        </View>
        */}
        <View style={styles.buttonContainer}>
          <Button onPress={saveSettings} style={{ backgroundColor: "green" }}><Text>Play!</Text></Button>
          <Button onPress={() => dispatch(setShowSettings(false))}><Text>Cancel</Text></Button>
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
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 16,
  },
  titleContainer: {
    height: '16%',
    width: '100%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {

  },
  content: {

  },
  pickerContainer: {
    width: '100%',
  },
  pickerTitle: {
    textAlign: 'center',
    fontWeight: 700,
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyButton: {
    borderWidth: 2,
    borderColor: 'darkgray',
    borderRadius: 8,
    padding: 12,
    width: '23%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultySelected: {
    backgroundColor: 'mediumpurple',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 60,
    gap: 16
  }
});