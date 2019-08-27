import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TripDetail extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        hell from detail {this.props.match.params.slug}
        {this.props.location.state.trip.adult_price}{" "}
      </div>
    );
  }
}
