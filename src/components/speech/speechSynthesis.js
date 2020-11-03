export class SpeechVoices {
  constructor(props) {
    this.voices = SpeechVoices.setVoices()
  }

  static setVoices() {
    return window.speechSynthesis.getVoices();
  }

  getVoices() {
    return this.voices
  }
}

export class SpeechSynthesis {
  constructor(props) {
    this.utterance = new window.SpeechSynthesisUtterance();
    this.selected = SpeechSynthesis.getVoice(props.voices, props.settings.langs);

    if (this.selected) {
      this.utterance.voice = this.selected;
      this.utterance.text = props.text;
      this.utterance.lang = props.settings.lang;
      this.utterance.pitch = props.settings.pitch;
      this.utterance.rate = props.settings.rate;
      this.utterance.volume = props.settings.volume;
    }
  }

  static getVoice(voices, langs) {
    const particularVoice = voices.find(voice => {
      return langs.find(lang => voice.name === lang);
    })

    if (particularVoice) {
      return particularVoice
    } else {
      const defaultVoice = voices.find(voice => /es/.test(voice.lang));
      return defaultVoice
    }
  }

  onend(func) {
    this.utterance.onend = func;
  }

  onerror(func) {
    this.utterance.onerror = func;
  }

  speak() {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(this.utterance);
  }

  cancel() {
    window.speechSynthesis.cancel();
  }
}
