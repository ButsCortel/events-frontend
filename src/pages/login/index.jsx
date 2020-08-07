import React, { useState, useContext } from "react";
import api from "../../services/api";
import { UserContext } from "../../user-context";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert,
} from "reactstrap";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const { setIsLoggedIn } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await api.post("/login", { email, password }); //send email, password object
    const user_id = response.data.user_id || false;
    const user = response.data.user || false;

    try {
      if (user && user_id) {
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);
        setIsLoggedIn(true);
        history.push("/");
      } else {
        const { message } = response.data;
        setHasError(true);
        setErrorMessage(message);
        setTimeout(() => {
          setErrorMessage("");
          setHasError(false);
        }, 2000);
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage("The server returned an error");
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    name === "email" ? setEmail(value) : setPassword(value);
  };
  const handleClick = () => {
    history.push("/register");
  };

  return (
    <Container>
      <h2>Login</h2>
      <p>
        Please <strong>login</strong> first.
      </p>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="email" className="mr-sm-2">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email."
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="password" className="mr-sm-2">
            Password
          </Label>
          <Input
            className="mb-2"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password."
          />
        </FormGroup>
        <FormGroup>
          <Button className="mt-2 submit-btn">Submit</Button>
        </FormGroup>
        <FormGroup>
          <Button className="secondary-btn" onClick={handleClick}>
            Create Account
          </Button>
        </FormGroup>
      </Form>
      {hasError ? <Alert color="danger mx-2">{errorMessage}</Alert> : <br />}
    </Container>
  );
};

export default Login;
