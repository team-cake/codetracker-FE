import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Button, View, Linking } from "react-native";
import { fetchTopics } from "../store/topics/actions";
import { selectTopics } from "../store/topics/selectors";

// import { Button } from "monalisa-ui";

export default function TopicListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { topics } = useSelector(selectTopics);
  // console.log("TopicListScreen -> topics", topics);

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {topics.map((t) => {
        return (
          <Button
            title={t.name}
            onPress={() => navigation.navigate("TopicDetail")}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
