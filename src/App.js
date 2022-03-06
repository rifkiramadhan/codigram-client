import './App.css';
import logo from './assets/logo.png';
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Navbar, Container, Nav, DropdownButton, Dropdown,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './helpers/AuthContext';
import {
  Login,
  Registration,
  Post,
  CreatePost,
  Home,
  Profile,
  ChangePassword,
  PageNotFound,
} from './pages';
import { URL } from './config/config';

function App() {
  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios.get(`${URL}/auth/auth`, {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState({
          ...authState,
          status: false,
        });
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, [authState]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({
      username: '',
      id: 0,
      status: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Navbar
          bg="light"
          variant="light"
          sticky="top"
          expand="sm"
          className="navbar navbar-expand-lg navbar-default"
          collapseOnSelect
        >
          <Container fluid>

            <Navbar.Brand>
              <a
                href="/"
                className="text-decoration-none"
              >
                <img
                  src={logo}
                  className="rounded-circle"
                  width="40px"
                  height="40px"
                  alt=""
                />
                {' '}
                <span className="text-dark fw-bold">Codigram</span>
              </a>
            </Navbar.Brand>

            <Navbar.Toggle className="coloring" />

            <Navbar.Collapse className="justify-content-end fw-medium">

              <Nav className="justify-content-end">
                <ul className="navbar-nav ml-auto mb-2 mb-lg-0 gap-3">
                  {!authState.status ? (
                    <>
                      <li className="nav-item">
                        <a
                          className="nav-link text-dark text-uppercase"
                          href="http://bit.ly/Rifki-Portfolio"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa-solid fa-address-card text-success" />
                          {' '}
                          About Me
                        </a>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="btn btn-light btn-outline-success fw-bold w-100 text-uppercase rounded-pill"
                          to="/login"
                        >
                          Sign In
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="btn btn-success fw-bold w-100 text-uppercase rounded-pill"
                          to="/registration"
                        >
                          Sgin Up
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link
                          className="nav-link text-dark text-uppercase"
                          to="/"
                        >
                          <i className="fa-solid fa-house-user text-success" />
                          {' '}
                          Beranda
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link text-dark text-uppercase"
                          to="/createpost"
                        >
                          <i className="fa-solid fa-circle-plus text-success" />
                          {' '}
                          Buat Postingan
                        </Link>
                      </li>
                    </>
                  )}
                </ul>

                {authState.status ? (
                  <DropdownButton
                    className="text-uppercase"
                    title={`Hello, ${authState.username}`}
                    variant="light"
                    menuVariant="light"
                  >
                    <Dropdown.Item>
                      <Link
                        className="btn nav-link text-dark fw-medium text-uppercase"
                        to={`/profile/${authState.id}`}
                      >
                        {' '}
                        <i className="fa-solid fa-user-doctor text-success" />
                        {' '}
                        Profile
                      </Link>
                      <Link
                        className="btn nav-link text-dark fw-medium text-uppercase"
                        onClick={() => logout()}
                        to="/login"
                      >
                        {' '}
                        <i className="fa-solid fa-arrow-right-to-bracket text-danger" />
                        {' '}
                        Sign Out
                      </Link>
                    </Dropdown.Item>
                  </DropdownButton>
                ) : (
                  <Dropdown.Item className="d-none">
                    <Link
                      className="nav-link text-dark fw-medium text-uppercase d-none"
                      to="/users/register"
                    />
                  </Dropdown.Item>
                )}
              </Nav>

            </Navbar.Collapse>

          </Container>
        </Navbar>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/post/:id" exact component={Post} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/changepassword" exact component={ChangePassword} />
          <Route path="*" exact component={PageNotFound} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
