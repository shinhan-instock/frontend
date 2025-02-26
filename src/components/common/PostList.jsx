import Post from "./Post";
import userImg from "/img/userImg.png";
const postsData = [
  {
    img: userImg,
    id: 1,
    content:
      "게시글 1 입니다~~~~~~~~~~~~~~~~~~~~~~~ 삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박 ",
    nickname: "사용자 1",
    created_at: "2025.2.17 15:36",
    stock: "삼성전자",
    likes: 5,
    comments: 10,
  },
  {
    img: userImg,
    id: 2,
    content:
      "게시글 2 입니다~~~~~~~~~~~~~~~~~~~~~~~ 삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박 ",
    nickname: "사용자 2",
    created_at: "2025.2.17 15:36",
    stock: "삼성전자",
    likes: 5,
    comments: 10,
  },
  {
    img: userImg,
    id: 3,
    content:
      "게시글 3 입니다~~~~~~~~~~~~~~~~~~~~~~~ 삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박삼성전자 대박 ",
    nickname: "사용자 3",
    created_at: "2025.2.17 15:36",
    stock: "삼성전자",
    likes: 5,
    comments: 10,
  },
];

export default function PostList() {
  return (
    <div className="flex flex-col gap-10">
      {postsData.map((post) => (
        <Post
          key={post.id}
          img={post.img}
          content={post.content}
          nickname={post.nickname}
          created_at={post.created_at}
          stock={post.stock}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
