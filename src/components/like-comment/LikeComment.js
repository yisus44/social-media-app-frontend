import React, { useState, useEffect } from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import MyPopup from '../../util/myPopup';

export default function LikeComment({
  comment: { likeCount, likes, id },
  user,
}) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    console.log('yeye');
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likeComment] = useMutation(LIKE_COMMENT_MUTATION, {
    variables: { commentId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="brown" floated="left">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="brown" basic floated="left">
        <Icon name="heart" />
      </Button>
    )
  ) : (
    //this reach if we dont are logged in
    <Button as={Link} to="/login" color="brown" basic floated="left">
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likeComment}>
      <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>
      <Label basic color="brown" pointing="right">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_COMMENT_MUTATION = gql`
  mutation likeComment($commentId: ID!) {
    likeComment(commentId: $commentId) {
      likes {
        username
      }
      id
      likeCount
    }
  }
`;
