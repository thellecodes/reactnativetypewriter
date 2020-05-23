import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {interpolate, SpringUtils} from 'react-native-reanimated';
import {withSpringTransition, withTimingTransition} from 'react-native-redash';
import BtnBg from './src/images/bg.svg';
import TypeWriter from './TypeWriter';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.bounce = new Animated.Value(0);
    this.showText = new Animated.Value(0);
    const textAnime = withTimingTransition(this.showText);
    const bounceAnime = withSpringTransition(this.bounce, {
      ...SpringUtils.makeDefaultConfig(),
      overshootClamping: true,
      damping: new Animated.Value(20),
    });

    this.translateY = interpolate(bounceAnime, {
      inputRange: [0, 1],
      outputRange: [-300, 0],
    });
    this.opacity = interpolate(textAnime, {
      inputRange: [0, 0.7, 0.9, 1],
      outputRange: [0, 0, 0, 1],
    });
  }

  state = {
    texts: ['One', 'Two', 'Three'],
  };

  componentDidMount() {
    this.bounce.setValue(1);
    this.showText.setValue(1);
  }

  render() {
    return (
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.View
          style={{
            translateY: this.translateY,
            borderWidth: 1,
            borderColor: 'red',
          }}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
            }}>
            <BtnBg />
          </Animated.View>
          <Animated.View
            style={{
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Animated.Text
              style={{
                fontFamily: 'Gilroy-Bold',
                fontWeight: '900',
                fontSize: 40,
                opacity: this.opacity,
                textTransform: 'uppercase',
                letterSpacing: 8,
              }}>
              <TypeWriter words={this.state.texts} wait={3000} />
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}

App.options = {
  topBar: {
    visible: false,
  },
};

export default App;
