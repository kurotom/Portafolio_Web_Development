import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import keysPiano from './data_keys.js';


class PianoKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    }
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.pressedKey = this.pressedKey.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.pressedKey);
  }
  componentWillUnmount() {
    document.addEventListener('keydown', this.pressedKey)
  }

  pressedKey(evento) {
    if (evento.key.toUpperCase() === this.props.keyboard) {
      if (this.state.playing) {
        this.setState({
          playing: false
        })
      } else {
        this.setState({
          playing: true
        })
      }

      this.play();
    }
  }

  play() {
    let sound = document.getElementById(this.props.keyboard);
    console.log(this.state.playing);
    sound.currentTime = 0;
    sound.play();

    let a = sound.parentElement;

    const sharpsKeys = ['key1', 'key3', 'key5', 'key8', 'key10', 'key13', 'key15', 'key17', 'key20', 'key22']

    console.log(a.getAttribute('id'), sharpsKeys.includes(a.getAttribute('id')))

    if (sharpsKeys.includes(a.getAttribute('id'))) {
      a.setAttribute('class', 'keypiano sharpsPress');
    } else {
      a.setAttribute('class', 'keypiano normalPress');
    }

    setTimeout(() => {
      if (sharpsKeys.includes(a.getAttribute('id'))) {
        a.setAttribute('class', 'keypiano sharps');
      } else {
        a.setAttribute('class', 'keypiano normal');
      }
    }, 500)


  }

  pause() {
    console.log('paused', this.state.playing)
  }

  render() {
    return (
      <li
        id={'key' + this.props.id}
        key={this.props.keyboard}
        className={'keypiano ' + this.props.classname}
        onClick={this.play}
      >
        {this.props.keyboard}
        <audio
          id={this.props.keyboard}
          src={this.props.src}>
        </audio>
      </li>
    )
  }
}

class Keyspiano extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    let arrPiano;
    arrPiano = this.props.keyPiano.map((nada, index, item) => {
      return (
        <PianoKey
          id={index}
          note={item[index].key}
          src={item[index].src}
          keyboard={item[index].keyboard}
          classname={item[index].classKey}
        />
      )
    })

    return (
      <ul id='layout'>
        {arrPiano}
      </ul>
    )
  }
}

class Piano extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <div >
          <div id='containerPiano' className=''>
            <Keyspiano keyPiano={keysPiano}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Piano;
