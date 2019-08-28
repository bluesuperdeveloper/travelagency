import React from "react";
import {
  Container,
  Divider,
  Dropdown,
  Header,
  Image,
  Grid,
  List,
  Menu,
  Segment,
  Button,
  Icon,
  Responsive,
  Sidebar,
  Visibility
} from "semantic-ui-react";

import { Navbar } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { cartAdd } from "../store/actions/cart";

class CustomLayout extends React.Component {
  componentDidMount() {
    this.props.cartAdd();
  }

  render() {
    const { authenticated, cart, loading } = this.props;
    return (
      <React.Fragment>
        <Menu fixed="top" borderless size="mini">
          <Container>
            <Menu.Item href="/" header>
              <Image
                size="mini"
                src={require("./1.png")}
                style={{ marginRight: "1em" }}
              />
              Universal Travel
            </Menu.Item>

            <Menu.Item href="/">Home</Menu.Item>

            <Menu.Item href="/trips">Trips</Menu.Item>

            <Menu.Item position="right">
              {authenticated ? (
                <React.Fragment>
                  <Menu.Item header onClick={() => this.props.logout()}>
                    Logout
                  </Menu.Item>
                  <Dropdown
                    text={`${cart !== null ? cart.order_items.length : 0}`}
                    pointing
                    className="link item"
                    loading={loading}
                    icon="cart"
                  >
                    <Dropdown.Menu>
                      {cart &&
                        cart.order_items.map(order_item => {
                          return (
                            <Dropdown.Item key={order_item.id}>
                              {order_item.quantity} x {order_item.item.title}
                            </Dropdown.Item>
                          );
                        })}
                      {cart && cart.order_items.length < 1 ? (
                        <Dropdown.Item>No items in your cart</Dropdown.Item>
                      ) : null}
                      <Dropdown.Divider />
                      <Dropdown.Header>Check Out</Dropdown.Header>
                    </Dropdown.Menu>
                  </Dropdown>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link to="/login">
                    <Button inverted secondary style={{ marginLeft: "0.5em" }}>
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button inverted primary style={{ marginLeft: "0.5em" }}>
                      Sign Up
                    </Button>
                  </Link>
                </React.Fragment>
              )}
            </Menu.Item>
          </Container>
        </Menu>
        {this.props.children}
        <Segment
          inverted
          vertical
          style={{ margin: "5em 0em 0em", padding: "3em 0em" }}
        >
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Our Ranges" />
                <List link inverted>
                  <List.Item as="a">Asia</List.Item>
                  <List.Item as="a">America</List.Item>
                  <List.Item as="a">Africa</List.Item>
                  <List.Item as="a">Canada</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Contact Us" />
                <List link inverted>
                  <List.Item as="a">Demo street</List.Item>
                  <List.Item as="a">Demo road</List.Item>
                  <List.Item as="a">111-111-111</List.Item>
                  <List.Item as="a">Demo</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Links" />
                <List link inverted>
                  <List.Item as="a">Myuniversal Travel</List.Item>
                  <List.Item as="a">TianBao Travel</List.Item>
                  <List.Item as="a">Tai Travel</List.Item>
                  <List.Item as="a">AsianHolidays</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header inverted as="h4" content="About Us" />
                <p>
                  We make it a point to lead by example and instill the best
                  qualities in our employees. This truly makes a difference in
                  our company morale and in the way our clients view us. We know
                  we are doing things right as our company is growing - mostly
                  through referrals and by word of mouth.
                </p>
              </Grid.Column>
            </Grid>

            <Divider inverted section />
            <Image centered size="mini" src={require("./1.png")} />
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="#">
                Site Map
              </List.Item>
              <List.Item as="a" href="#">
                Contact Us
              </List.Item>
              <List.Item as="a" href="#">
                Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    cart: state.cart.shoppingCart,
    loading: state.cart.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    cartAdd: () => dispatch(cartAdd())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
