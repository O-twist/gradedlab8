import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  // Add Task
  const addTask = () => {
    if (taskText.trim() === "") return;
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  // Toggle Task Done
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.checkbox}>
        <Text>{item.done ? "✅" : "⬜"}</Text>
      </TouchableOpacity>
      <Text
        style={[styles.taskText, item.done && styles.taskTextDone]}
        onPress={() => toggleTask(item.id)}
      >
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Input and Add Button */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  inputRow: { flexDirection: "row", marginBottom: 10 },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButton: {
    marginLeft: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 2,
  },
  taskText: { flex: 1, fontSize: 16 },
  taskTextDone: { textDecorationLine: "line-through", color: "#888" },
  checkbox: { marginRight: 10 },
  deleteButton: { marginLeft: 10, fontSize: 18 },
});
