/* eslint-disable prettier/prettier */
import {TextInput, View, Button, Alert} from 'react-native';
import React, {useEffect, useState } from 'react';
import * as RootNavigation from './../../Navigations/rootNavigation';
import {openDatabase} from 'react-native-sqlite-storage';

import styles from './styles';
import { useRoute } from '@react-navigation/native';
import UserList from '../UserList';
import routes from '..';
let db = openDatabase({name: 'UserDatabase.db'});

const UpdateData = () => {
  const route = useRoute();
  const [name, setName] = useState(route.params.data.name);
  const [task, setTask] = useState(route.params.data.task);

  const updateUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_user set name=?, task=? where user_id=?',
        [name, task, route.params.data.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => RootNavigation.navigate(routes.UserList),
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
      );
    });
  };
  useEffect(() => {
    setName(name);
    setTask(task);
  }, []);



  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='Enter Name' onChangeText={(txt) => setName(txt)}  value={name}/>
      <TextInput style={styles.input} placeholder='Enter Task' onChangeText={(txt) => setTask(txt)} value={task}/>
      <View style={styles.buttonStyle}>
      <Button title={'Update'} onPress={() => {updateUser()}}/>
      </View>
      </View>
  );
};
export default UpdateData;
