import React, {Component} from 'react';
import {Text} from 'react-native';

export default class TypeWriter extends Component {
  constructor(props) {
    super(props);
    this.words = this.props.words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(this.props.wait, 10);
    this.isDeleting = false;
  }

  state = {
    mytxt: '',
  };

  type = () => {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check is deleting
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert to txt State
    this.setState({mytxt: this.txt});

    // Initials type speed
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // if the word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Pause at the end of word
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      // Reset deleting
      this.isDeleting = false;

      // Move to the next word
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  };

  componentDidMount() {
    this.type();
  }

  render() {
    return <>{this.txt}</>;
  }
}
