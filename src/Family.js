import React, { Component } from "react";
import { View, Text } from "react-native";
import { Avatar, Badge } from "react-native-elements";
<<<<<<< HEAD
import { getActiveMood, getMoodsByFamilyId } from "./store/mood";
=======
import { fetchUsers, fetchUser, fetchRelated } from "./store/users";
import { getActiveMood } from "./store/mood";
>>>>>>> 77f08096ee7d8eec8d7fbde81e63aa78fb28c23f
import { connect } from "react-redux";
import ActionButton from "react-native-circular-action-menu";
import { findMoodColor, findMoodText } from "./HelperFunctions";

class Family extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (this.props.mood.id !== prevProps.mood.id) {
      this.load();
    }
  }

  load = () => {
    this.props.getActiveMood(this.props.user.id);
    this.props.getMoodsByFamilyId(this.props.user.familyId);
  };

  findFamily = (user, fam) => {
    return fam.filter(
      usr => usr.familyId === user.familyId && usr.id !== user.id
    );
  };

  render() {
    const { user, mood, moods } = this.props;

    if (mood.id && this.props.moods !== undefined) {
      const family = this.findFamily(user, moods);
      const moodColor = findMoodColor(mood.value);
      const moodText = findMoodText(mood.value);
      return (
        <View
          style={{
            flex: 0.9,
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingEnd: 25,
              marginBottom: 25
            }}
          >
            <ActionButton
              active={true}
              degrees={0}
              radius={145}
              outRangeScale={1}
              onLongPress={() =>
                this.props.navigation.navigate("AvatarGenerator", {
                  user: user,
                  buttonSet: "UserButtons",
                  mood: mood
                })
              }
              icon={
                <View>
                  <Avatar
                    rounded
                    overlayContainerStyle={{
                      borderWidth: 5,
                      borderColor: moodColor
                    }}
                    size={120}
                    source={{
                      uri: `${user.imgUrl}`
                    }}
                    title={user.firstName}
                  />
                  <Badge
                    containerStyle={{
                      position: "relative",
                      top: -18
                    }}
                    badgeStyle={{
                      backgroundColor: moodColor,
                      paddingHorizontal: 10,
                      borderColor: "transparent"
                    }}
                    value={
                      <Text style={{ fontSize: 12, color: "white" }}>
                        {`${moodText}`} mood
                      </Text>
                    }
                  />
                </View>
              }
            >
              {family.map(person => {
<<<<<<< HEAD
                const personMoodColor = findMoodColor(
                  person.moods.find(m => m.active).value
                );
                const personMoodText = findMoodText(
                  person.moods.find(m => m.active).value
                );
=======
                //temp hardcoding values here
                const personMoodColor = findMoodColor(0.5);
                const personMoodText = findMoodText(0.5);
>>>>>>> 77f08096ee7d8eec8d7fbde81e63aa78fb28c23f
                return (
                  <ActionButton.Item key={person.id}>
                    <View>
                      <Avatar
                        rounded
                        overlayContainerStyle={{
                          borderWidth: 5,
                          borderColor: personMoodColor
                        }}
                        size={110}
                        source={{
                          uri: `${person.imgUrl}`
                        }}
                        title={person.firstName}
                        onPress={() =>
                          this.props.navigation.navigate("AvatarGenerator", {
                            user: person,
                            buttonSet:
                              person.age > 18
                                ? "RelativeButtons"
                                : "ChildButtons",
                            mood: person.moods.find(m => m.active)
                          })
                        }
                      />
                      <Badge
                        containerStyle={{
                          position: "relative",
                          top: -18
                        }}
                        badgeStyle={{
                          backgroundColor: personMoodColor,
                          paddingHorizontal: 10,
                          borderColor: "transparent"
                        }}
                        value={
                          <Text style={{ fontSize: 12, color: "white" }}>
                            {`${personMoodText}`} mood
                          </Text>
                        }
                      />
                    </View>
                  </ActionButton.Item>
                );
              })}
            </ActionButton>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
<<<<<<< HEAD
    getActiveMood: id => dispatch(getActiveMood(id)),
    getMoodsByFamilyId: familyId => dispatch(getMoodsByFamilyId(familyId))
=======
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUser: id => dispatch(fetchUser(id)),
    fetchRelated: id => dispatch(fetchRelated(id)),
    getActiveMood: id => dispatch(getActiveMood(id))
>>>>>>> 77f08096ee7d8eec8d7fbde81e63aa78fb28c23f
  };
};

const mapStateToProps = ({ mood, moods, user }) => {
  return {
    user,
    mood,
    moods
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family);
