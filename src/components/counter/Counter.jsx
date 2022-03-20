import React, { Component } from "react";
import "./counter.css";
import PropTypes from "prop-types";

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
    this.increment = this.increment.bind(this);
    this.reset = this.reset.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  render() {
    return (
      <div className="counter">
        <CounterButton
          by={1}
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        />
        <CounterButton
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        />
        <CounterButton
          by={5}
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        />
        <CounterButton
          by={10}
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        />
        <span className="count">{this.state.counter}</span>
        <br></br>
        <button className="reset" onClick={this.reset}>
          Reset
        </button>
      </div>
    );
  }

  increment(by) {
    console.log(`increment from child - ${by}`);
    this.setState((preState) => {
      return { counter: preState.counter + by };
    });
  }

  decrement(by) {
    this.setState({
      counter: this.state.counter - by,
    });
  }

  reset() {
    this.setState({
      counter: 0,
    });
  }
}

class CounterButton extends Component {
  //define the initial state in a constructor
  //state => counter 0
//   constructor() {
//     super();
    // this.state = {
    //   counter: 0,
    // };
    // this.increment = this.increment.bind(this);
    // this.decrement = this.decrement.bind(this);
//   }

  //Arrow function prevents the need to do a binding
  //render = () =>
  render() {
    //const style = {fontSize : "40px", padding : "15px 30px"};
    return (
      <div className="counterbutton">
        <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
        <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
        {/* <span className="count" style={style}>{this.state.counter}</span> */}
      </div>
    );
  }

//   increment() {
//     // this.setState({
//     //   counter: this.state.counter + this.props.by,
//     // });
//     this.props.incrementMethod(this.props.by);
//   }

//   decrement() {
//     this.props.decrementMethod(this.props.by);
//   }
}

CounterButton.defaultProps = {
  by: 2,
};

CounterButton.propTypes = {
  by: PropTypes.number,
};

export default Counter;
