import CardHeader from "./CardHederComponents/CardHeader";


export default function Comment({ comment ,postId}) {
  return (
    <CardHeader
      avatar={comment.commentCreator.photo}
      headerName={comment.commentCreator.name}
      headerTime={comment.createdAt}
      IsCommentHeader={true}
      comment={comment}
      postId={postId}
    />
  );
}
