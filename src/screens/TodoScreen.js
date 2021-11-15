import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  SafeAreaView,
  Animated,
  TouchableOpacity
} from "react-native";

import Swipeable from 'react-native-gesture-handler/Swipeable';

import axios from "axios";

const TodoScreen = (props) => {
  //Init State
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = () => {
    setIsLoading(true);
    axios
      .get("https://6177f0a79c328300175f5c57.mockapi.io/todos")
      .then((res) => {
        setTodo(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Error Fetch Data");
        setIsLoading(false);
      });
  };

  const addTodo = () => {
    let data = {
      title: text
    }
    axios
      .post("https://6177f0a79c328300175f5c57.mockapi.io/todos", data)
      .then((res) => {
        setTodo(res.data);
        getTodo();
      })
      .catch(() => {
        alert("Error Add Data");
        setIsLoading(false);
      });
  };

  const deleteTodo = (id) => {
    const url = `https://6177f0a79c328300175f5c57.mockapi.io/todos/${id}`
    axios
      .delete(url)
      .then((res) => {
      console.log(res);
      getTodo();
    })
    .catch(() => {
      alert("Error Delete Data");
      setIsLoading(false);
    });
  }

  const markComplete = async(id) => {
    try {
      let data = {
        completed: true
      }
      const res = await axios.put(`https://6177f0a79c328300175f5c57.mockapi.io/todos/${id}`, data);
      getTodo();
    } catch (error) {
      console.log(error);
    }
  }

  const leftSwipe = ( progress, dragX, id) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1.8],
      extrapolate: 'clamp',
    });

    // const deleteTodo = (id) => {
    //   const url = `https://6177f0a79c328300175f5c57.mockapi.io/todos/${id}`
    //   axios
    //     .delete(url)
    //     .then((res) => {
    //     console.log(res);
    //     getTodo();
    //   })
    //   .catch(() => {
    //     alert("Error delete Data");
    //     setIsLoading(false);
    //   });
    // }
    return (
      <TouchableOpacity onPress={deleteTodo} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.Text style={{transform: [{scale: scale}]}}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5FCFF" }}>
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={todo}
          keyExtractor={(item) => item.id.toString()}
          refreshing={isLoading}
          onRefresh={getTodo}
          renderItem={({ item }) => (
            // <Swipeable key={item.id} renderLeftActions={leftSwipe}>
            <View>
              <View style={styles.listItemCont}>
                <Button style={{backgroundColor: "white"}} title="❌" onPress={() => deleteTodo(item.id)} />
                <Text
                  style={[
                    styles.listItem,
                    item.completed && { textDecorationLine: "line-through" },
                  ]}
                >
                  {item.title}
                </Text>
                {!item.completed && (
                  <Button title="✔" onPress={() => markComplete(item.id)} />
                )}
              </View>
              <View style={styles.hr} />
            </View>
            // </Swipeable>
          )}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Add Task"
          placeholderTextColor="white"
          onSubmitEditing={addTodo}
          onChangeText={setText}
          value={text}
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFA0A0",
    paddingTop: 20,
    height: "100%",
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
  },
  hr: {
    height: 1,
    backgroundColor: "gray",
  },
  listItemCont: {
    backgroundColor: "#FF5757",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "left"
  },
  textInput: {
    backgroundColor: "#930707",
    fontSize: 18,
    color:"white",
    height: 40,
    width: "100%",
    paddingRight: 10,
  },
  deleteBox: {
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "red",
    fontSize: 16
  }
});
