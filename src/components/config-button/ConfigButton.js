import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MyPopup from '../../util/myPopup';

export default function ConfigButton({ postId, commentId, callback }) {
  return (
    <MyPopup content={commentId ? 'Update comment' : 'Update post'}>
      <Button
        as={Link}
        to={`/posts/edit/${postId}`}
        color="grey"
        floated="right"
      >
        <Icon name="configure" style={{ margin: 0 }} />
      </Button>
    </MyPopup>
  );
}
