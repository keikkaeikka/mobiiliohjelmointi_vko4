import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import Row from './components/Row';
import { Task } from './types/Todo';
const STORAGE_KEY = 'TODO_LIST_ITEMS';

export default function App() {
  const [items, setItems] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [loaded, setLoaded] = useState(false);

  const addItem = () => {
  if (input.trim() !== '') {
    setItems(prev => [
      ...prev,
      { id: Date.now().toString(), 
        name: input.trim(), 
        completed: false, 
      },
    ]);
    setInput('');
  }
};

  const toggleItem = (id: string) => {
  setItems(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    )
  );
};

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setItems(JSON.parse(json));
      } catch {
        Alert.alert('Could not load items');
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const saveItems = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(items)
        );
      } catch {
        Alert.alert('Could not save items');
      }
    };

  saveItems();
}, [items, loaded]);


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Add item"
          />
          <Button title="Add" 
            onPress={addItem}
            disabled={!loaded}
          />
        </View>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Row
                item={item}
                onPress={toggleItem}
              />
            )}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
});
