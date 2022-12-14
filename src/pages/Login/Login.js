import React, { useContext, useState} from "react";
import { ButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const { googleLogin, signIn, githubLogin} = useContext(AuthContext);
  const [error, setError] = useState(null)

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
 

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate('/')
      })
      .catch((error) => console.error(error));
  };
  const handleGithubSignIn = () => {
    githubLogin(githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) =>{
         console.error(error.message)
         setError(error.message);
        });     
  };
  return (
    <div onSubmit={handleSubmit}>
      <Form className="shadow-lg bg-body mt-lg-5 mt-4 p-3 mb-4 rounded h-100">
        <h2 className="text-center  text-dark py-4 fw-bolder">Login Here</h2>
        <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <p className="text-danger">{error}</p>
        

        <Button className="px-4 mb-2" variant="primary" type="submit">
          login
        </Button>

        <ButtonGroup vertical className="d-block w-50 mx-auto">
          <Button
            onClick={handleGoogleSignIn}
            className="mb-2"
            variant="outline-primary"
          >
            <FaGoogle></FaGoogle> Login with Google
          </Button>

          <Button onClick={handleGithubSignIn} variant="outline-dark">
            <FaGithub></FaGithub> Login with Github
          </Button>
        </ButtonGroup>
      </Form>
      <p className="mt-4 text-center">
        New to Passion Chasers? <Link to="/register">Create a New Account</Link>{" "}
      </p>
    </div>
  );
};

export default Login;
