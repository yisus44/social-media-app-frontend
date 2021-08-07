import gql from 'graphql-tag';
import React from 'react';

import { useMutation } from '@apollo/client';

import { Button, Form } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../../util/graphql';

import { useForm } from '../../hooks/useForm';

export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });

      values.body = '';
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit} style={{ display: 'grid', margin: 'auto' }}>
        <h2>Write your own post!</h2>
        <Form.Field>
          <Form.Input
            placeholder="What are you thinking about?"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />

          <Button
            type="submit"
            style={{
              display: 'grid',
              margin: 'auto',
              backgroundColor: 'brown',
              color: 'white',
            }}
          >
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error?.graphQLErrors[0]?.message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
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
