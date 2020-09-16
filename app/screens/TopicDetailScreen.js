import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicById } from "../store/topicDetails/actions";
import { fetchUserTopics } from "../store/userTopics/actions";
import { selectTopicDetails } from "../store/topicDetails/selectors";
import { Button, Card, Divider } from "monalisa-ui";

export default function TopicDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const topic = useSelector(selectTopicDetails);

  useEffect(() => {
    dispatch(fetchTopicById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchUserTopics());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Card bordered rounded>
        <Text>🚀 {topic.name}</Text>
        <Divider bgColor="#ff0000" />
        <Text> {topic.description}</Text>
      </Card>
      <Button
        title="Back to Topics"
        onPress={() => navigation.push("AppNav")}
        outline
      />
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
