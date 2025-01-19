import { useState, useReducer } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { Pressable, TextInput } from "react-native-gesture-handler";

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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ccc",
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

type ActionType = { type: "ADD_ITEM"; payload: string } 
| { type: "RESET_ITEMS" } 
| { type: "DELETE_ITEM"; index: number };

const itemsReducer = (state: string[], action: ActionType): string[] => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "RESET_ITEMS":
      return [];
    case "DELETE_ITEM":
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
};

export default function Index() {
  const [newItem, setNewItem] = useState<string>("");
  const [items, dispatch] = useReducer(itemsReducer, []);

  const addItem = () => {
    if (newItem.trim()) {
      dispatch({ type: "ADD_ITEM", payload: newItem });
      setNewItem("");
    }
  };

  const deleteItem = (index: number) => {
    dispatch({ type: "DELETE_ITEM", index });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
      <FlatList
        style={{ width: "100%" }}
        data={items}
        renderItem={({ item, index }) => (
          <Item content={item} index={index} onDelete={deleteItem} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter new item"
          value={newItem}
          onChangeText={setNewItem}
          style={styles.textInput}
        />
        <Button title="Add" onPress={addItem} />
      </View>
    </View>
  );
}
