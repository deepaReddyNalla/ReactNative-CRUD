import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  container: {
    flex: 1,
  },
  text: {
    width: 100,
    height: 100,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  buttonStyle: {
    marginHorizontal: 15,
  },
  containerText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default styles;
