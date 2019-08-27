import React, { Component } from "react";
import axios from "axios";
import { AdItemURL } from "../constant";

export default class Slider extends Component {
  state = {
    loading: false,
    error: null,
    data: []
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(AdItemURL)
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  }

  createPoints = data => {
    let points = [];
    console.log(data);
    // Outer loop to create parent
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        points.push(
          <li
            key={i}
            data-target="#carouselExampleIndicators"
            data-slide-to={i.toString(10)}
            className="active"
          ></li>
        );
      } else {
        points.push(
          <li
            key={i}
            data-target="#carouselExampleIndicators"
            data-slide-to="2"
          ></li>
        );
      }
    }
    return points;
  };

  createPics = data => {
    let pics = [];

    // Outer loop to create parent
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        pics.push(
          <div
            key={i}
            className="carousel-item active"
            style={{
              backgroundImage: `url(${data[i].adImage})`
            }}
          >
            <div className="carousel-caption d-none d-md-block">
              <h3>{data[i].title}</h3>
              <p>{data[i].brief}</p>
            </div>
          </div>
        );
      } else {
        pics.push(
          <div
            key={i}
            className="carousel-item"
            style={{
              backgroundImage: `url(${data[i].adImage})`
            }}
          >
            <div className="carousel-caption d-none d-md-block">
              <h3>{data[i].title}</h3>
              <p>{data[i].brief}</p>
            </div>
          </div>
        );
      }
    }
    return pics;
  };

  render() {
    const { loading, error, data } = this.state;
    console.log(data.length);
    return (
      <div style={{ position: "relative", top: "-8px" }}>
        <header>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">{this.createPoints(data)}</ol>

            <div className="carousel-inner" role="listbox">
              {this.createPics(data)}
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </header>
      </div>
    );
  }
}
