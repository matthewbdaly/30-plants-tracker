import { useState, useReducer } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { Pressable, TextInput } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  cancelButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Item = ({ content, index, onDelete }: { content: string, index: number, onDelete: (index: number) => void }) => (
  <View>
    <Text>{content}</Text>
    <Button title="Delete" onPress={() => onDelete(index)} />
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
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState<string>("");
  const [items, dispatch] = useReducer(itemsReducer, []);

  const openNewItemModal = () => {
    setModalVisible(true);
  };

  const addItem = () => {
    if (newItem.trim()) {
      dispatch({ type: "ADD_ITEM", payload: newItem });
      setNewItem("");
      setModalVisible(false);
    }
  };

  const deleteItem = (index: number) => {
    dispatch({ type: "DELETE_ITEM", index });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Add Item" onPress={openNewItemModal} />
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <Item content={item} index={index} onDelete={deleteItem} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Enter new item"
            value={newItem}
            onChangeText={setNewItem}
          />
          <Button title="Add" onPress={addItem} />
          <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={{ color: "white" }}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
