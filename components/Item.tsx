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
  deleteButton: {
    marginLeft: 10,
  },
});

const Item = ({ content, index, onDelete }: { content: string, index: number, onDelete: (index: number) => void }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText}>{content}</Text>
    <Pressable onPress={() => onDelete(index)} style={styles.deleteButton}>
      <Text>&times;</Text>
    </Pressable>
  </View>
);

export default Item;