/* eslint-disable prettier/prettier */
import {View, TouchableOpacity, FlatList, Text} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as RootNavigation from './../../Navigations/rootNavigation';
import UpdateData from '../UpdateData';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {openDatabase} from 'react-native-sqlite-storage';
import { useIsFocused } from '@react-navigation/native';
import routes from '..';
let db = openDatabase({name: 'UserDatabase.db'});
const UserList = () => {
  const isFocused = useIsFocused();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          {temp.push(results.rows.item(i));}
        setUserList(temp);
      });
    });
  };
  let deleteUser = (id: any) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    getData();
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };


  
  return (
    <View>
   <FlatList
        data={userList}
        renderItem={({item, index}) => {
          return (
           <View style={{flex: 1}}>
              <Text style={styles.itemText}>{'Name: ' + item.name}</Text>
              <Text style={styles.itemText}>{'Task: ' + item.task}</Text>
                  <View style={styles.row}>
                  <TouchableOpacity
                  onPress={() => {
                    RootNavigation.navigate(routes.UpdateData, {
                      data: {
                        name: item.name,
                        task: item.task,
                        id: item.user_id,
                      },
                    });
                  }} > 
                  <Text style={styles.updatetext}>{'Update'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={() => {
                    deleteUser(item.user_id);
                  }}>
                  <Text style={styles.deleteText}>{'Delete'}</Text>
                  </TouchableOpacity>
                  </View>
              </View>
          );
            }}
          />
   </View>
  );
};
export default UserList;
