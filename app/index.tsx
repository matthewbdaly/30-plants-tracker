import { useState } from "react";
import { Button, FlatList, Modal, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Item = ({ content }: { content: string }) => (
  <View>
    <Text>{content}</Text>
  </View>
);

export default function Index() {
  const {modalVisible, setModalVisible} = useState(false);

  const openNewItemModal = () => {
    setModalVisible(true);
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
        >
        <View>
          <TextInput
            placeholder="Enter new item"
            />
          <Button
            onPress={() => {}}
            title="Add"
            />
        </View>
      </Modal>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <FlatList
      data={[]}
      renderItem={({ item }) => <Item content={item} />}
      />
      <Button
        onPress={openNewItemModal}
        title="Add new item"
        />
    </View>
  );
}
