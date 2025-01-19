import { useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { Pressable, TextInput } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  cancelButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 5
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

const Item = ({ content }: { content: string }) => (
  <View>
    <Text>{content}</Text>
  </View>
);

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>("");

  const openNewItemModal = () => {
    setModalVisible(true);
  }

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem("");
      setModalVisible(false);
    }
  }

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
        <View>
          <TextInput
            placeholder="Enter new item"
            value={newItem}
            onChangeText={setNewItem}
            />
          <Button
            onPress={addItem}
            title="Add"
            />
            <Pressable
            onPress={() => setModalVisible(false)}
            style={styles.cancelButton}
            >
              <Text>&times;</Text>
            </Pressable>
        </View>
      </Modal>
      <Text>Add the plants you've eaten this week.</Text>
      <FlatList
      data={items}
      renderItem={({ item }) => <Item content={item} />}
      />
      <Button
        onPress={openNewItemModal}
        title="Add new item"
        />
    </View>
  );
}
