/* eslint-disable react/prop-types */
import Post from "./Post";

export default function PostList({ postsData }) {
  return (
    <div className="flex flex-col gap-10">
      {postsData.length !== 0 ? (
        postsData.map((post) => (
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
            sentimentScore={post.sentimentScore}
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
