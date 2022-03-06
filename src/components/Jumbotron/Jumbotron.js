import React, { Component } from 'react';
import './Jumbotron.css';

class Jumbotron extends Component {
  render() {
    const today = new Date();
    const hour = today.getHours();

    return (
      <div className="main-hero-image">
        <div className="main-hero-text">
          { hour < 12 ? (
            <h1>Good Morning</h1>
          ) : hour < 18 ? (
            <h1>Good Afternoon</h1>
          ) : (
            <h1>Good Evening</h1>
          )}
          <p>Let`s consult with a Specialist Doctor</p>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
