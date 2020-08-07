import React, { useState, useContext } from "react";
import api from "../../services/api";
import { UserContext } from "../../user-context";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoggedIn } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (
        email !== "" &&
        password !== "" &&
        firstName !== "" &&
        lastName !== ""
      ) {
        const response = await api.post("/user/register", {
          email,
          password,
          firstName,
          lastName,
        }); //send email, password object
        const user = response.data.user;
        const user_id = response.data.user_id;
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);
        setIsLoggedIn(true);
        history.push("/");
      } else {
        setHasError(true);
        setErrorMessage("Missing required information");
        setTimeout(() => {
          setHasError(false);
          setErrorMessage("");
        }, 2000);
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage(error.response.data.messages);
      setTimeout(() => {
        setHasError(false);
        setErrorMessage("");
      }, 2000);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;

      default:
        break;
    }
  };

  return (
    <Container>
      <h2>New Account</h2>
      <p>
        Please <strong>create an account</strong> first.
      </p>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="text"
            name="firstName"
            id="firstName"
            //value={firstName}
            onChange={handleChange}
            placeholder="Enter your First name."
          />
        </FormGroup>

        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="text"
            name="lastName"
            id="lastName"
            //value={Last name}
            onChange={handleChange}
            placeholder="Enter your Last name."
          />
        </FormGroup>

        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="email"
            name="email"
            id="email"
            //value={email}
            onChange={handleChange}
            placeholder="Enter your email."
          />
        </FormGroup>

        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="password"
            name="password"
            id="password"
            //value={password}
            onChange={handleChange}
            placeholder="Enter your password."
          />
        </FormGroup>
        <FormGroup>
          <Button className="submit-btn mt-2">Submit</Button>
        </FormGroup>
      </Form>
      {hasError ? <Alert color="danger mx-2">{errorMessage}</Alert> : ""}
    </Container>
  );
};

export default Register;
