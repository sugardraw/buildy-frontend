import React, { PureComponent } from "react";
import { View, Button, StyleSheet } from "react-native";

class Step extends PureComponent {
  constructor(props) {
    super(props);
    state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.children({
          onChangeValue: this.props.onChangeValue,
          values: this.props.values
        })}
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.button}
            title="Prev"
            disabled={this.props.currentIndex === 0}
            onPress={this.props.prevStep}
          />
          <Button
            style={styles.button}
            title="Next"
            disabled={this.props.isLast}
            onPress={this.props.nextStep}
          />
        </View>
      </View>
    );
  }
}

export default class Wizard extends PureComponent {
  static Step = props => <Step {...props} />;

  state = {
    index: 0,
    values: {
      ...this.props.initialValues
    }
  };

  _nextStep = () => {
    if (this.state.index !== this.props.children.length - 1) {
      this.setState(prevState => ({
        index: prevState.index + 1
      }));
    }
  };

  _prevStep = () => {
    if (this.state.index !== 0) {
      this.setState(prevState => ({
        index: prevState.index - 1
      }));
    }
  };

  _onChangeValue = (name, value) => {
    this.props.collectData(name, value);

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      }
    }));
  };

  render() {
    console.log("wizard data", this.state);

    return (
      <View>
        {React.Children.map(this.props.children, (element, index) => {
          if (index === this.state.index) {
            return React.cloneElement(element, {
              currentIndex: this.state.index,
              nextStep: this._nextStep,
              prevStep: this._prevStep,
              isLast: this.state.index === this.props.children.length - 1,
              onChangeValue: this._onChangeValue,
              values: this.state.values
            });
          }
          return null;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonWrapper: {
    flexDirection: "row",
    padding: 30
  },
  button: {
    margin: 30
  }
});
