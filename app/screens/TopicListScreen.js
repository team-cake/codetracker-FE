import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { fetchTopics } from "../store/topics/actions";
import { selectTopics } from "../store/topics/selectors";
import { Button } from "monalisa-ui";
import RNPickerSelect from "react-native-picker-select";

export default function TopicListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { topics } = useSelector(selectTopics);
  const [newTopics, setTopics] = useState([]);

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  function filteringTopics(e) {
    if (e === "Select an item..." || undefined) {
      setTopics([topics]);
    } else {
      const weekId = e;
      const filteredTopics = topics.filter((t) => {
        return Number(t.week) === parseInt(weekId);
      });
      setTopics(filteredTopics);
    }
  }
  const Dropdown = () => {
    return (
      <RNPickerSelect
        onValueChange={filteringTopics}
        items={[
          { label: "Week 1", value: "1" },
          { label: "Week 2", value: "2" },
          { label: "Week 3", value: "3" },
          { label: "Week 4", value: "4" },
          { label: "Week 5", value: "5" },
          { label: "Week 6", value: "6" },
          { label: "Week 7", value: "7" },
          { label: "Week 8", value: "8" },
          { label: "Week 9", value: "9" },
          { label: "Week 10", value: "10" },
          { label: "Week 11", value: "11" },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      {Dropdown()}
      {newTopics
        ? newTopics.map((t) => {
            return (
              <View>
                <Button
                  key={t.id}
                  title={t.name}
                  onPress={() =>
                    navigation.navigate("TopicDetail", {
                      id: t.id,
                    })
                  }
                />
              </View>
            );
          })
        : null}
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
