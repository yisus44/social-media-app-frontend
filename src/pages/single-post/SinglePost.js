import gql from 'graphql-tag';
import React, { useContext, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label,
} from 'semantic-ui-react';

import { AuthContext } from '../../context/auth';
import LikeButton from '../../components/like-button/LikeButton';
import DeleteButton from '../../components/delete-button/DeleteButton';
import MyPopup from '../../util/myPopup';

export default function SinglePost(props) {
  const postId = props.match.params.id;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment, { error }] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  if (error) {
    console.log(JSON.stringify(error, null, 2));
  }

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;

  if (data === undefined) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;

    postMarkup = (
      <Grid>
        <h1>Discussion</h1>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="data:image/png;base64,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"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>
                  {moment(new Date(Number(createdAt))).fromNow()}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <MyPopup content="Comment on post">
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log('Comment on post')}
                  >
                    <Button basic color="vk">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="vk" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </MyPopup>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Join the discussion</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />

                      <button
                        type="submit"
                        className="ui button brown"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit!
                      </button>
                    </div>

                    <h5>
                      If you are not seeing your comment please reload the page
                    </h5>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>
                    {moment(new Date(Number(createdAt))).fromNow()}
                  </Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
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
