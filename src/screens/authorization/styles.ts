import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(15),
    justifyContent: 'center',
  },
  button: {
    height: normalize(56),
    marginBottom: normalize(8),
  },
  buttonsContentStyle: {
    flex: 1,
    width: normalize(80),
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  flex: {flex: 1},
  buttonFontSize: {
    fontSize: normalize(18),
  },
});
