import React, { Component } from "react";
import { Grid, Row, Col, Nav, NavItem, Glyphicon } from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import Main from "../components/Main";

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Grid>
              <Row>
                <Col xs={2} md={4}>
                  <Nav stacked>
                    <NavItem
                      componentClass={Link}
                      href="/"
                      to="/"
                      active={window.location.pathname === "/"}
                    >
                      <Glyphicon glyph="home" /> Home
                    </NavItem>
                    <NavItem
                      componentClass={Link}
                      href="/main"
                      to="/main"
                      active={window.location.pathname === "/main"}
                    >
                      <Glyphicon glyph="start" /> Main
                    </NavItem>
                  </Nav>
                </Col>
                <Col xs={10} md={8}>
                  <Route path="/" component={() => <Home />} exact />
                  <Route path="/main" component={() => <Main />} />
                </Col>
              </Row>
            </Grid>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
