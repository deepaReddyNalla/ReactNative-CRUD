import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  container: {
    marginTop: 100,
  },
  text:{
    fontSize: 20,
    color:'black',
  },
  deleteText:{
    color:'red',
    fontSize: 30,
  },
  updatetext:{
    fontSize: 30,
    color:'blue',
  },
  userItem: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
});

export default styles;
