import React from 'react';
import { Card, CardText, CardBody } from 'reactstrap';
import CommentModal from './CommentModal';

const Comments = ({ comments }) => {
  return (
    <>
      <CommentModal buttonLabel='Create Comment' />
      {comments.length > 0 ? (
        <div style={{ marginTop: '10px', paddingBottom: '100px' }}>
          <h3>Comments:</h3>
          {comments.map(comment => {
            return (
              <Card style={{ marginTop: '10px' }} key={comment.id}>
                <CardBody>
                  <CardText>
                    {comment.content} - by {comment.commenter}
                  </CardText>
                </CardBody>
              </Card>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default Comments;
