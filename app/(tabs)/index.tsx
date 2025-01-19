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

const Item = ({ content, index, onDelete }: { content: string , index: number, onDelete: Function }) => (
  <View>
    <Text>{content}</Text>
    <Button title="Delete" onPress={onDelete} />
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal
        visible={modalVisible}
        animationType="slide"
        style={styles.modalContent}
      >
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Enter new item"
            value={newItem}
            onChangeText={setNewItem}
          />
          <Button onPress={addItem} title="Add" />
          <Pressable
            onPress={() => setModalVisible(false)}
            style={styles.cancelButton}
          >
            <Text style={{ color: "white" }}>&times;</Text>
          </Pressable>
        </View>
      </Modal>
      <Text>Add the plants you've eaten this week.</Text>
      <FlatList
        data={items}
        renderItem={({ item, index }) => <Item content={item} index={index} onDelete={() => dispatch({ type: "DELETE_ITEM", index })} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button onPress={openNewItemModal} title="Add new item" />
    </View>
  );
}
