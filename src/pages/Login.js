import { gql } from '@apollo/client';
import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm } from '../hooks/useForm';

import { AuthContext } from '../context/auth';

export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.login);
      props.history.push('/');
    },
    onError(err) {
      alert('Bad input');
      setErrors(err.graphQLErrors[0]?.extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>

        <Form.Input
          label="username"
          placeholder="username"
          name="username"
          value={values.username}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Login!
        </Button>
      </Form>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation register($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
