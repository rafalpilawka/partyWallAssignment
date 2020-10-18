import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  button: {
    height: 56,
    marginBottom: 8,
  },
  buttonsContentStyle: {
    flex: 1,
    width: 56,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    flexDirection: 'row',
    width: '70',
    flex: 1,
  },
});
