import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from 'redux/reducers/counter.slice';

export type TestScreenType = {
  navigation?: any;
  route?: any;
};

export const TestScreen = ({navigation, route}: TestScreenType) => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const incrementValue = Number(incrementAmount) || 0;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Redux test</Text>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(decrement())}>
            <Text style={styles.buttonText}>Decrement value</Text>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{count}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(increment())}>
            <Text style={styles.buttonText}>Increment value</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Navigation test</Text>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Initial')}>
            <Text style={styles.buttonText}>Open Rn Page</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 5,
  },
  header: {
    justifyContent: 'center',
  },
  headerText: {
    color: 'black',
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
  textContainer: {
    padding: 5,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
