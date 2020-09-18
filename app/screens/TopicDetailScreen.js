import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicById } from "../store/topicDetails/actions";
import { fetchUserTopics, addingUserTopic } from "../store/userTopics/actions";
import { selectTopics } from "../store/topics/selectors";
import { selectUser } from "../store/user/selectors";
import { selectTopicDetails } from "../store/topicDetails/selectors";
import { Button, Card, Divider, Spinner } from "monalisa-ui";
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
  console.log("TopicDetailScreen -> text", text);

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
    // console.log("Text is now:", );
    setText(" ");
  };
  
  console.log("UserTopics:", userTopics)
  console.log("TOPIC", topic)

  const relatedUserTopic = userTopics ? userTopics.find((top) => {
    return top.topicId === topic.id
  }) : null

  console.log("RELATEDUSERTOPIC", relatedUserTopic)

  return (
    <View style={styles.container}>
      <Card bordered rounded>
        <Text>Your Topics: </Text>
        <Text>
          <Text>
            {topic.name}
          </Text>
          <Text>
            Status: {relatedUserTopic ? (relatedUserTopic.isDone ? "Done" : "To Do") : null}
          </Text>
        </Text>
        <Divider bgColor="#ff0000" />
        <Text> </Text>
      </Card>

      <Card bordered rounded>
        <Text>🚀 {topic.name}</Text>
        <Divider bgColor="#ff0000" />
        <Text> {topic.description}</Text>
      </Card>

      <Card>
        <Text>Create your summary: </Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="type your summary"
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={100}
        />
        <Button title="Submit Summary" onPress={onPress} />
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

// {userTopics ? (
//   userTopics.map((t) => {
//     const newTopic = topics
//       ? topics.find((top) => {
//           return parseInt(top.id) === parseInt(t.topicId);
//         })
//       : null;
//     return (
//       <View>
//         <Text>
//           {newTopic && newTopic.name ? newTopic.name : null}
//         </Text>
//         <Text>Is it done? {topic.isDone ? "yes" : "no"}</Text>
//       </View>
//     );
//   })
// ) : (
//   <Spinner titleStyle={{ fontSize: 16 }} title="Loading..." />
// )}