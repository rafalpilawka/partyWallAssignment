import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(15),
    justifyContent: 'flex-start',
  },
  menu: {
    paddingHorizontal: '5%',
    width: '90%',
  },
  input: {
    height: 56,
    marginBottom: normalize(10),
  },
  buttonsContentStyle: {
    flex: 1,
    width: normalize(56),
  },
  separator: {
    marginVertical: normalize(30),
    height: 1,
    width: '80%',
  },

  buttonContainer: {
    marginTop: normalize(15),
  },
  buttonFont: {
    fontSize: normalize(20),
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
