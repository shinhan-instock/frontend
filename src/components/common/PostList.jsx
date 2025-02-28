/* eslint-disable react/prop-types */
import Post from "./Post";
import userImg from "/img/userImg.png";

export default function PostList({ postsData }) {
  return (
    <div className="flex flex-col gap-10">
      {postsData.length !== 0 ? (
        postsData.map((post) => (
          <Post
            key={post.id}
            img={post.img == null ? userImg : post.img}
            content={post.content}
            nickname={post.nickname}
            created_at={
              post.update_at == null ? post.created_at : post.update_at
            }
            hashtag={post.hashtag}
            likes={post.likes}
            comments={post.comments}
            sentimentScore={post.sentimentScore}
          />
        ))
      ) : (
        <div>아직 팔로잉 중인 게시글이 없어요 🥲</div>
      )}
    </div>
  );
}
