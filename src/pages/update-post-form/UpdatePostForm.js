import gql from 'graphql-tag';
import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../context/auth';

import { useForm } from '../../hooks/useForm';

export default function PostForm(props) {
  const postId = props.match.params.id;
  let history = useHistory();
  const { values, onChange, onSubmit } = useForm(updatePostCallback, {
    body: '',
    postId,
  });
  const { user } = useContext(AuthContext);
  const [updatePost, { error }] = useMutation(UPDATE_POST_MUTATION, {
    variables: values,
  });

  function updatePostCallback() {
    try {
      updatePost();
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
    history.push('/');
  }

  if (!user) {
    history.push('/');
  }

  return (
    <>
      <div className="form-container">
        <Form onSubmit={onSubmit}>
          <h2>Update post</h2>
          <Form.Field>
            <Form.Input
              placeholder="Update your post!"
              name="body"
              onChange={onChange}
              value={values.body}
              error={error ? true : false}
            />
          </Form.Field>
          <Button
            type="submit"
            style={{
              backgroundColor: 'brown',
              color: 'white',
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

const UPDATE_POST_MUTATION = gql`
  mutation updatePost($body: String!, $postId: ID!) {
    updatePost(body: $body, postId: $postId) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
