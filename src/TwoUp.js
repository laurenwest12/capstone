import React, { Component } from "react";
import { Picker, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { getActiveMood } from "./store/mood";
import { fetchFamilyMembers } from "./store/family";
import { fetchUserRelationships } from "./store/users";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { findMoodColor } from "./HelperFunctions";
import AllPolls from "./Polls/AllPolls";
import Events from "./Events/Events";

class TwoUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Status"
    };
  }

  componentDidMount() {
    this.load();
  }

  load = () => {
    this.props.getActiveMood(this.props.user.id);
    this.props.fetchFamilyMembers(this.props.user.familyId);
  };

  generateStatusMeter = value => {
    const colors = [
      { hex: "#FF2A00", val: 0 },
      { hex: "#E68200", val: 0.25 },
      { hex: "#d4b21f", val: 0.5 },
      { hex: "#64c300", val: 0.75 },
      { hex: "#009510", val: 1 }
    ];
    return colors.map(color => {
      let bgColor = color.val <= value ? color.hex : "#ffffff";
      return (
        <View
          key={color.val}
          style={{
            height: 75,
            width: 75,
            backgroundColor: bgColor,
            borderColor: "black",
            borderWidth: 1
          }}
        />
      );
    });
  };

  render() {
    const {
      user,
      navigation,
      mood,
      familyMembers,
      userRelationships
    } = this.props;

    const relative = navigation.getParam("relative");

    if (familyMembers.length && userRelationships.length) {
      const relationship = userRelationships.find(
        relation => relation.userId === user.id
      );

      const relativeMoodValue = familyMembers
        .find(member => member.id === relative.id)
        .moods.find(m => m.active).value;

      return (
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingTop: 50,
              paddingHorizontal: 10
            }}
          >
            <Avatar
              rounded
              overlayContainerStyle={{
                borderWidth: 5,
                borderColor: findMoodColor(mood.value)
              }}
              size={100}
              source={{
                uri: `${user.imgUrl}`
              }}
              title={user.firstName}
            />

            <Picker
              selectedValue={this.state.display}
              style={{ height: 100, width: 100, marginBottom: 50 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ display: itemValue })
              }
            >
              <Picker.Item label="Status" value="Status" />
              <Picker.Item label="Events" value="Events" />
              <Picker.Item label="Polls" value="Polls" />
            </Picker>

            <Avatar
              rounded
              overlayContainerStyle={{
                borderWidth: 5,
                borderColor: findMoodColor(relativeMoodValue)
              }}
              size={100}
              source={{
                uri: `${relative.imgUrl}`
              }}
              title={relative.firstName}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 100
            }}
          >
            {this.state.display === "Status"
              ? this.generateStatusMeter(relationship.status)
              : null}

            {this.state.display === "Polls" ? <AllPolls /> : null}

            {this.state.display === "Events" ? <Events /> : null}
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
    getActiveMood: id => dispatch(getActiveMood(id)),
    fetchFamilyMembers: familyId => dispatch(fetchFamilyMembers(familyId)),
    fetchUserRelationships: id => dispatch(fetchUserRelationships(id))
  };
};

const mapStateToProps = ({ mood, user, familyMembers, userRelationships }) => {
  return {
    user,
    mood,
    familyMembers,
    userRelationships
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TwoUp)
);