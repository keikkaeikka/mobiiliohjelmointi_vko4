import React from 'react';
import { TouchableOpacity, Text, StyleSheet, } from 'react-native';
import { Task } from '../types/Todo';

interface RowProps {
  item: Task;
  onPress: (id: string) => void;
}

export default function Row({ item, onPress }: RowProps) {
  return (
    <TouchableOpacity
      style={styles.rowFront}
      onPress={() => onPress(item.id)}
    >
      <Text
        style={[
          styles.text,
          item.completed && styles.completedText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 16,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
});
