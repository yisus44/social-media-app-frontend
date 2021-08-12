import React from 'react';

import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../../components/post-card/PostCard';
import gql from 'graphql-tag';

export default function MostPopular() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) {
    return <h1>Loading popular posts...</h1>;
  }

  if (data) {
    console.log(data);
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Our top 3 posts!</h1>
      </Grid.Row>
      <br></br>

      <br></br>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {data &&
              data.getMostPopularPosts.map((post) => (
                <Grid.Column key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getMostPopularPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
