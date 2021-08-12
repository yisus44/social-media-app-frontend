import { gql } from '@apollo/client';
import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { AuthContext } from '../../context/auth';

export default function Register(props) {
  const context = useContext(AuthContext);
  const [errors] = useState({});
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = function (event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.register);
      props.history.push('/');
    },
    onError(err) {
      alert('Bad input');
      console.log(err);
    },
    variables: values,
  });
  const onSubmit = function (event) {
    try {
      event.preventDefault();
      addUser();
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>

        <Form.Input
          label="username"
          placeholder="username"
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors?.username ? true : false}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          value={values.email}
          error={errors?.email ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          error={errors?.password ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors?.confirmPassword ? true : false}
          onChange={onChange}
        />

        <Button type="submit" color="brown">
          Sign me in!
        </Button>
      </Form>
      {errors?.length > 0
        ? Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )
        : ''}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
