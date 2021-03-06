import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../../components/post-card/PostCard';
import PostForm from '../../components/post-form/PostForm';
import { AuthContext } from '../../context/auth';

import { FETCH_POSTS_QUERY } from '../../util/graphql';
let postCount = 0;
export default function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);
  if (loading) {
    return <h1>Loading posts...</h1>;
  }
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent posts</h1>
      </Grid.Row>
      <br></br>
      {user && <PostForm />}
      <br></br>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {data &&
              data.getPosts.map((post) => {
                if (postCount % 3 === 0) {
                  return (
                    <Grid.Column key={post.id}>
                      <br></br>
                      <PostCard post={post} />
                    </Grid.Column>
                  );
                }
                postCount++;
                return (
                  <Grid.Column key={post.id}>
                    <PostCard post={post} />
                  </Grid.Column>
                );
              })}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}
