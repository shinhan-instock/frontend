import Post from "./Post";
import { useLogin } from "../../hooks/useLogin";

export default function PostList({ postsData }) {
  const { userInfo } = useLogin();
  const filteredPosts = postsData.filter(
    (post) => String(post.deleted) !== "true"
  );
  return (
    <div className="flex flex-col gap-10">
      {filteredPosts.length !== 0 ? (
        filteredPosts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            profileImg={post.profileImg}
            images={post.images}
            content={post.content}
            nickname={post.nickname}
            created_at={
              post.update_at == null ? post.created_at : post.update_at
            }
            hashtag={post.hashtag}
            likes={post.likes}
            comments={post.comments}
            sentimentScore={
              post.sentimentScore == -1 ? "..." : post.sentimentScore
            }
            deleted={post.deleted}
            scrapped={post.scrapped}
            liked={post.liked}
          />
        ))
      ) : (
        <div>아직 관련 게시글이 없어요 🥲</div>
      )}
    </div>
  );
}
