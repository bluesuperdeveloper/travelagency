import React from "react";
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
  Message
} from "semantic-ui-react";
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

            <Image src="/images/wireframe/short-paragraph.png" />
          </Segment>
        )}
        <Item.Group divided>
          {data.map(item => {
            return (
              <Item key={item.id}>
                <Item.Image src={item.img} />
                <Item.Content>
                  <Item.Header as="a">{item.title}</Item.Header>
                  <Item.Meta>
                    <span className="cinema">From city: {item.from_city}</span>
                  </Item.Meta>
                  <Item.Description>
                    About This Trip: {item.descriptions}
                  </Item.Description>
                  <Item.Extra>
                    <Button
                      primary
                      floated="right"
                      icon
                      labelPosition="right"
                      onClick={() => this.handleAddToCart(item.slug)}
                    >
                      Order Now!
                      <Icon name="cart" />
                    </Button>
                    <Label color="blue">{item.slug}</Label>
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </Container>
    );
  }
}

export default ItemList;
