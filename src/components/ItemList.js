import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Icon,
  Image,
  Item,
  Label,
  Container,
  Segment,
  Dimmer,
  Loader,
  Message,
  AccordionTitle
} from "semantic-ui-react";
import Title from "./Title";
import { authAxios } from "../auth";
import { itemlistURL, addtocartURL } from "../constant";
const paragraph = <Image src="/images/wireframe/short-paragraph.png" />;

class ItemList extends React.Component {
  state = {
    loading: false,
    error: null,
    data: []
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(itemlistURL)
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  }

  handleAddToCart = slug => {
    this.setState({ loading: true });
    authAxios
      .post(addtocartURL, { slug })
      .then(res => {
        console.log(res.data);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { loading, error, data } = this.state;
    console.log(data);
    return (
      <Container>
        {error && (
          <Message
            error
            header="Invalid Information"
            content={JSON.stringify(error)}
          />
        )}
        {loading && (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>

            <Image src="https://via.placeholder.com/150" />
          </Segment>
        )}
        <section className="featured-rooms">
          <Title title="All Trips" />
          <div className="featured-rooms-center">
            {data.map(item => {
              return (
                <article key={item.id} className="room">
                  <div className="img-container">
                    <img src={item.img} alt="Trips" />
                    <div className="price-top">
                      <h6>${item.adult_price}</h6>
                      <p>per person</p>
                    </div>
                    <Link
                      to={"/trips/${item.slug}"}
                      className="btn btn-primary room-link"
                    >
                      Detail
                    </Link>
                  </div>
                  <p className="room-info">{item.title}</p>
                </article>
              );
            })}
          </div>
        </section>
      </Container>
    );
  }
}

export default ItemList;
