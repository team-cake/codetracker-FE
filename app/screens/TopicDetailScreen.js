import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicById } from "../store/topicDetails/actions";
import { fetchUserTopics, addingUserTopic } from "../store/userTopics/actions";
import { selectTopics } from "../store/topics/selectors";
import { selectUser } from "../store/user/selectors";
import { selectTopicDetails } from "../store/topicDetails/selectors";
import { Button, Card, Divider, Spinner, Textarea, Text } from "monalisa-ui";
import { selectUserTopics } from "../store/userTopics/selectors";
import { createSummary } from "../store/summary/actions";

// import { utc } from "moment";

export default function TopicDetailScreen({ route, navigation }) {
  const user = useSelector(selectUser);
  const { id } = route.params;
  const dispatch = useDispatch();
  const { topics } = useSelector(selectTopics);
  const topic = useSelector(selectTopicDetails);
  const { userTopics } = useSelector(selectUserTopics);
  const [topicName, setTopicName] = useState(" ");
  const [text, setText] = useState(" ");

  useEffect(() => {
    dispatch(fetchTopicById(id));
    dispatch(addingUserTopic(id, user.id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchUserTopics());
  }, [dispatch]);

  const onPress = (event) => {
    event.preventDefault();
    dispatch(createSummary(text, user.id, topic.id));

    setText(" ");
  };

  const relatedUserTopic = userTopics
    ? userTopics.find((top) => {
        return top.topicId === topic.id;
      })
    : null;

  return (
    <View style={styles.container}>
      <Text h2>{topic.name}</Text>
      <View style={{ height: 20 }} />
      <Card
        bordered
        style={{
          width: 250,
          height: 400,
          shadowOffset: { width: 2, height: 2 },
          shadowColor: "#333",
          shadowOpacity: 0.3,
          shadowRadius: 2,
          borderRadius: 6,
        }}
      >
        <Text>
          <Text>
            Status:{" "}
            {relatedUserTopic
              ? relatedUserTopic.isDone
                ? "Done"
                : "To Do"
              : null}
          </Text>
          <View style={{ height: 30 }} />
        </Text>
        <Divider bgColor="#ff0000" />

        <Text h6>
          🚀 <em>{topic.name}</em>
        </Text>
        <Divider bgColor="#ff0000" />
        <Text> 🔹{topic.description}</Text>
        <View style={{ height: 40 }} />
        <Text>
          <strong>Create your summary:</strong>{" "}
        </Text>

        <Textarea
          borderColor="#ff0000"
          style={{ height: 100 }}
          placeholder="type your summary"
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={100}
        />
        <Button title="Submit Summary" onPress={onPress} outline />
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
