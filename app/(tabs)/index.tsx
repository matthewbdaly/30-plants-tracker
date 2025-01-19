import { useState, useReducer, useEffect, useRef } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View, TextInput as RNTextInput, useColorScheme } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from '@/components/Item';

const styles = StyleSheet.create({
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

type ActionType = { type: "ADD_ITEM"; payload: string } 
| { type: "RESET_ITEMS" } 
| { type: "DELETE_ITEM"; index: number }
| { type: "SET_ITEMS"; payload: string[] };

const itemsReducer = (state: string[], action: ActionType): string[] => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "RESET_ITEMS":
      return [];
    case "DELETE_ITEM":
      return state.filter((_, index) => index !== action.index);
    case "SET_ITEMS":
      return action.payload;
    default:
      return state;
  }
};

export default function Index() {
  const colourScheme = useColorScheme();
  const [newItem, setNewItem] = useState<string>("");
  const [items, dispatch] = useReducer(itemsReducer, []);
  const textInputRef = useRef<RNTextInput>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) {
          dispatch({ type: "SET_ITEMS", payload: JSON.parse(storedItems) });
        }
      } catch (error) {
        console.error("Failed to load items from storage", error);
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem('items', JSON.stringify(items));
      } catch (error) {
        console.error("Failed to save items to storage", error);
      }
    };

    saveItems();
  }, [items]);

  const addItem = () => {
    if (newItem.trim()) {
      if (items.includes(newItem)) {
        Alert.alert("Duplicate Item", "This item already exists.");
      } else {
        dispatch({ type: "ADD_ITEM", payload: newItem });
        setNewItem("");
        textInputRef.current?.focus();
      }
    }
  };

  const deleteItem = (index: number) => {
    dispatch({ type: "DELETE_ITEM", index });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={textInputRef}
          placeholder="Enter new item"
          value={newItem}
          onChangeText={setNewItem}
          style={styles.textInput}
        />
        <Button title="Add" onPress={addItem} />
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={[...items].sort()}
        renderItem={({ item, index }) => (
          <Item content={item} darkMode={colourScheme === "dark"} index={index} onDelete={deleteItem} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
