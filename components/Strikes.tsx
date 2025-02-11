import {View, StyleSheet, Text} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useAppSelector} from "@/app/hooks";

export default function Strikes() {

  const strikes = useAppSelector(state => state.game.strikes)

  return (
    <View style={styles.container}>
      <Text>Strikes: </Text>
      {strikes >= 1 && <FontAwesome name="close" size={24} color="red" />}
      {strikes >= 2 && <FontAwesome name="close" size={24} color="red" />}
      {strikes >= 3 && <FontAwesome name="close" size={24} color="red" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})