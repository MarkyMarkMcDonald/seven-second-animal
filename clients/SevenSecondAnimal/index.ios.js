/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import React, { Component } from 'react';
import Sketch from 'react-native-sketch';
import DeviceUUID from 'react-native-device-uuid';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  sketch: {
    height: 250, // Height needed; Default: 200px
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#111111',
    padding: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

class SevenSecondAnimal extends Component {

  constructor(props) {
    super(props);
    this.onReset = this.onReset.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    DeviceUUID.getUUID().then((uuid) => {
      this.setState({
        uuid: uuid
      });
    }).catch(() => {
      this.setState({
        uuid: "dumpster"
      });
    })
  }

  state = {
    encodedSignature: null,
  };

  /**
   * Do extra things after the sketch reset
   */
  onReset() {
    console.log('The drawing has been cleared!');
  }

  /**
   * The Sketch component provides a 'saveImage' function (promise),
   * so that you can save the drawing in the device and get an object
   * once the promise is resolved, containing the path of the image.
   */
  onSave() {
    console.log("save called");
    this.sketch.saveImage(this.state.encodedSignature)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  /**
   * On every update (touch up from the drawing),
   * you'll receive the base64 representation of the drawing as a callback.
   */
  onUpdate(base64Image) {
    console.log("image updated");
    console.log(base64Image);
    this.setState({ encodedSignature: base64Image });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Use your finger on the screen to sign.
        </Text>
        <Sketch
          fillColor="#f5f5f5"
          strokeColor="#111111"
          strokeThickness={2}
          onReset={this.onReset}
          onUpdate={this.onUpdate}
          ref={(sketch) => { this.sketch = sketch; }}
          style={styles.sketch}
        />
        <TouchableOpacity
          disabled={!this.state.encodedSignature}
          style={styles.button}
          onPress={this.onSave}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

AppRegistry.registerComponent('SevenSecondAnimal', () => SevenSecondAnimal);
