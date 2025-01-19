import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    flex: 1,
  },
  darkItemText: {
    flex: 1,
    color: "#fff",
  },
  deleteButton: {
    marginLeft: 10,
  },
});

const Item = ({ content, darkMode, index, onDelete }: { content: string, darkMode: boolean, index: number, onDelete: (index: number) => void }) => (
  <View style={styles.itemContainer}>
    <Text style={darkMode ? styles.darkItemText : styles.itemText}>{content}</Text>
    <Pressable onPress={() => onDelete(index)} style={styles.deleteButton}>
      <Text style={darkMode ? styles.darkItemText : styles.itemText}>&times;</Text>
    </Pressable>
  </View>
);

export default Item;