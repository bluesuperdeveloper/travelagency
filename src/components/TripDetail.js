import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { itemlistURL } from "../constant";

export default class TripDetail extends Component {
  constructor(props) {
    super(props);

    this.slug = props.match.params.slug;
    this.state = {
      data: {},
      error: ""
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (typeof this.props.location.state === "undefined") {
      axios
        .get(itemlistURL + "?q=" + this.slug)
        .then(res => {
          this.setState({ data: res.data[0] });
        })
        .catch(err => {
          this.setState({ error: err });
        });
    } else {
      this.setState({ data: this.props.location.state.trip });
    }
  }
  render() {
    console.log(this.state);
    const { data } = this.state;
    if (typeof data === "undefined") {
      return <Redirect to="/error" />;
    }
    return (
      <div>
        <h1>Trip Title : {data.title}</h1>
        <h3>Adult Price: {data.adult_price}</h3>
        <h3>Children Price: {data.children_price}</h3>
        <h3>Descriptions: {data.descriptions}</h3>
        <h3>From City: {data.from_city}</h3>
        <h3>To City: {data.to_city}</h3>
        <h3>Start Date: {data.start_date}</h3>
        <h3>Trip Duration: {data.trip_duration}</h3>
        <h3>Terms of Condition: {data.terms_conditions}</h3>
        <img style={{ width: "400px", height: "300px" }} src={data.img} />
      </div>
    );
  }
}
