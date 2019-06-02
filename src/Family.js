import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { Avatar } from "react-native-elements";
import { fetchUsers, fetchUser, fetchRelated } from "./store";
import { connect } from "react-redux";
// import AvatarChild from "./AvatarChild";

class Family extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.load();
  }

  load = () => {
    const id = "b40453fe-171e-4eee-8ea2-2efb93e70ad2";
    this.props.fetchUsers();
    this.props.fetchUser(id);
  };

  findFamily = user => {
    return this.props.users.filter(
      usr => usr.familyId === user.familyId && usr.id !== user.id
    );
  };

  // begin >> create family grid layout <<

  formatGrid = (family, numColumns) => {
    const numFullRows = Math.floor(family.length / numColumns);
    let numElementsLastRow = family.length - numFullRows * numColumns;
    while (numElementsLastRow !== numColumns && numElementsLastRow !== 0) {
      // while (numElementsLastRow !== numColumns) {
      family.push({ key: `blank-${numElementsLastRow}`, empty: true });
      numElementsLastRow = numElementsLastRow + 1;
    }
    return family;
  };

  keyExtractor = index => index.toString();

  renderItem = user => {
    // if (user.empty === true) {
    //   return (
    //     <View
    //       style={{
    //         backgroundColor: "transparent"
    //       }}
    //     />
    //   );
    // }
    if (user.age > 18) {
      return (
        <Avatar
          keyExtractor={this.keyExtractor}
          rounded
          overlayContainerStyle={{
            borderWidth: 1,
            margin: 10
          }}
          size={125}
          title={user.firstName}
          source={{
            uri: user.imgUrl
          }}
          onPress={() =>
            this.props.navigation.navigate("User", {
              firstName: user.firstName,
              imgUrl: user.imgUrl
            })
          }
        />
      );
    } else {
      return (
        <Avatar
          keyExtractor={this.keyExtractor}
          rounded
          overlayContainerStyle={{
            borderWidth: 1,
            margin: 10
          }}
          size={125}
          title={user.firstName}
          source={{
            uri: user.imgUrl
          }}
          onPress={() =>
            this.props.navigation.navigate("AvatarChild", {
              firstName: user.firstName,
              imgUrl: user.imgUrl
            })
          }
        />
      );
    }
  };

  // end >> create family grid layout <<

  render() {
    if (this.props.user.id && this.props.users.length) {
      const user = this.props.user;
      const family = this.findFamily(user);

      const numColumns = 3;

      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Avatar
              rounded
              overlayContainerStyle={{ borderWidth: 1 }}
              size={150}
              title={user.firstName}
              source={{
                uri: user.imgUrl
              }}
              onPress={() =>
                this.props.navigation.navigate("User", {
                  firstName: user.firstName,
                  imgUrl: user.imgUrl,
                  userId: user.id
                })
              }
            />
          </View>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <FlatList
              data={this.formatGrid(family, numColumns)}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
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
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUser: id => dispatch(fetchUser(id)),
    fetchRelated: id => dispatch(fetchRelated(id))
  };
};

const mapStateToProps = ({ users, user, related }) => {
  return {
    users,
    user,
    related
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family);
