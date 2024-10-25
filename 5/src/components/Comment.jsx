import React from 'react';
import { useSelector } from 'react-redux';

const Comment = ({ commentId }) => {
  // BEGIN (write your solution here)
    const comment = useSelector((state) => {
        const currentComment = state.commentsReducer.comments.find(({ id }) => id === commentId);
        return currentComment;
    });
    const author = useSelector((state) => {
        const currentAuthor = state.usersReducer.users.find(({ id }) => id === comment?.author);
        return currentAuthor;
    });
  // END

  if (!author || !comment) {
    return null;
  }

  return (
    <>
      <h5 className="card-title">{ author.name }</h5>
      <p className="card-text">{ comment.text }</p>
    </>
  );
};

export default Comment;
