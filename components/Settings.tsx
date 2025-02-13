import {View, StyleSheet, Modal} from "react-native";
import { categories } from "@/utilities/categories";
import Button from "@/components/Button";
import {Picker} from '@react-native-picker/picker';
import {fetchQuestions, setCategory, setNewGame, setShowSettings} from "@/features/gameSlice";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import Text from "@/components/Text";


export default function Settings() {

  const category = useAppSelector(state => state.game.category)
  const showSettings = useAppSelector(state => state.game.showSettings)
  const dispatch = useAppDispatch()

  const saveSettings = () => {
      dispatch(fetchQuestions(category))
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
                key={category.value}
                label={category.label}
                value={category.value}
              />
            )}
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={saveSettings}><Text>Save</Text></Button>
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
  },
  titleContainer: {
    height: '16%',
    width: '100%',
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
    width: '100%',
    paddingTop: 20,

  },
  pickerTitle: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 60,
    gap: 16
  }
});