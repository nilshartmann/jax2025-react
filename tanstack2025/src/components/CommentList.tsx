import { CommentDtoList } from "@/types";

type CommentListProps = {
  comments: CommentDtoList;
};
export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className={"CommentList"}>
      <h1>Comments</h1>
      {comments.map((c) => (
        <div key={c.id} className={"CommentItem"}>
          <h2>{c.text}</h2>
        </div>
      ))}
    </div>
  );
}
