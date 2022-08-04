import React from 'react';
import './TimeNowShow.css';

class TimeNow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeNowString: '',
    }
  }
  componentDidMount() {
    this.counterTime = setInterval(() => {
      let date = new Date().toLocaleTimeString();
      this.setState({
        timeNowString: date,
      })
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.counterTime);
  }

  render() {
    return (
      <div>
        {this.state.timeNowString}
      </div>
    );
  }
}

export default TimeNow;
