/* eslint-disable prettier/prettier */
import {TextInput, View, Button, Alert, Text} from 'react-native';
import React, {useEffect, useState } from 'react';
import * as RootNavigation from './../../Navigations/rootNavigation';
//import database, { firebase } from '@react-native-firebase/database';
import {openDatabase} from 'react-native-sqlite-storage';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import UserList from '../UserList';
import routes from '..';

let db = openDatabase({name: 'UserDatabase.db'});

const AddUsers = () => {
  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const saveUser = () => {
    console.log(name, task);
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (name, task) VALUES (?,?)',
        [name, task],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => RootNavigation.navigate(routes.UserList),
                },
              ],
              {cancelable: false},
            );
          } else alert('users created failed');
        },
        error => {
          console.log(error);
        },
      );
    });
  };
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), task VARCHAR(100))',
              [],
            );
          }
        },
        error => {
          console.log(error);
        },
      );
    });
  }, []);

  
  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>{ 'CRUD APP'}</Text>
      <TextInput style={styles.input} placeholder='Enter Name' onChangeText={(txt) => setName(txt)} value={name}/>
      <TextInput style={styles.input} placeholder='Enter Task' onChangeText={(txt) => setTask(txt)} value={task}/>
      <View style={styles.buttonStyle}>
      <Button title={'Submit'} onPress={() => {saveUser()}}/>
      </View>
      </View>
  );
};
export default AddUsers;
