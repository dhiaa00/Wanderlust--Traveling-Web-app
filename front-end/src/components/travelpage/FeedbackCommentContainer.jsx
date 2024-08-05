import React from "react";

const FeedbackCommentContainer = () => {
  return (
    <div className="feedback-comment-container">
      {reviews.length !== 0 && (
        <p className="feedback-comment">
          <span className="button-left"></span>
          {reviews[0].comment}
          <span className="button-right"></span>
        </p>
      )}
    </div>
  );
};

export default FeedbackCommentContainer;
