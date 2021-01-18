import React, { Component } from "react";
import { SpeechSynthesis } from "./speechSynthesis";

export default class Speech extends Component {
  constructor(props) {
    super(props);

    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.onend = this.onend.bind(this);
    this.onerror = this.onerror.bind(this);
  }

  componentDidMount() {
    this.play();
  }

  setSpeechSynthesis() {
    this.speechSynthesis = new SpeechSynthesis(this.props);

    this.speechSynthesis.onend(this.onend);
    this.speechSynthesis.onerror(this.onerror);
  }

  play() {
    if (this.props.setSpeechStatus) this.props.setSpeechStatus(true);
    this.setSpeechSynthesis();
    this.speechSynthesis.speak();
  }

  stop() {
    this.speechSynthesis.cancel();
  }

  onend() {
    if (this.props.setSpeechStatus) this.props.setSpeechStatus(false);
  }

  onerror(error) {
    this.stop();
  }

  render() {
    return null;
  }
}
