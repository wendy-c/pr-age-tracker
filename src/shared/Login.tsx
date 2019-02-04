import React, {SFC} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: .7px solid #2e3d49;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px auto;
  max-width: 500px;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 25px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #181c1d;
  border-radius: 5px;
  border: none;
  padding: 5px;
  font-size: 16px;

  i {
    padding: 0 5px;
    font-size: 20px;
  }
  
  a {
    color: #fff;
    display: flex;
  }
`;

const Login:SFC<{}> = () => 
  <Container>
    <Title>Pull Request Age Tracker</Title>
    <Button>
    <a href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.CLIENT_ID}`}>
    <i className="fab fa-github-square"></i>
    Login with Github
    </a>
    </Button>
  </Container>;

export default Login;