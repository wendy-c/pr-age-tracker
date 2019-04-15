import React, { SFC } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 0.7px solid #ced9e0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px auto;
  max-width: 500px;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Button = styled.button`
  border-radius: 5px;
  border: none;
  padding: 5px;
  font-size: 20px;
  border: 1px solid #000;
  margin-bottom: 30px;

  i {
    padding: 0 5px;
    font-size: 25px;
  }

  a {
    display: flex;
    align-items: center;

    &:hover {
      color: #000;
      text-decoration: none;
    }
  }
`;

const Octocat = styled.img`
  max-width: 350px;
  max-height: 350px;
  margin: 30px 0 50px;
`;

const Login: SFC<{}> = () => (
  <Container>
    <Title>Pull Request Age Tracker</Title>
    <Octocat src="https://octodex.github.com/images/father_timeout.jpg" />
    <Button>
      <a
        href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${
          process.env.CLIENT_ID
        }`}
      >
        <i className="fab fa-github-square" />
        Login with Github
      </a>
    </Button>
  </Container>
);

export default Login;
