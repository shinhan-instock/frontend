import { useState } from 'react';
import useImg from '/img/userImg.png';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

export default function PostCreate() {
  const [postText, setPostText] = useState('');

  return (
    <div className="flex flex-row p-5">
      <img src={useImg} alt="User Profile" className="w-14 h-14 rounded-full" />
      <div className="p-4 mx-4 border rounded-2xl w-full text-stroke-gray">
        <input
          type="text"
          placeholder="게시글 작성"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="w-full text-gray-600 text-lg focus:outline-none"
        />
        <hr className="mt-2 text-stroke-gray" />
        <div className="flex justify-between items-center mt-2">
          <button className="text-blue-500 hover:text-blue-700">
            <MdOutlineAddPhotoAlternate className="w-8 h-8" />
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-full font-medium">
            POST
          </button>
        </div>
      </div>
    </div>
  );
}
