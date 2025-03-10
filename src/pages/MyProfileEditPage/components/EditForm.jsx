import profileImg from '/img/userImg.png';
import { LiaEditSolid } from 'react-icons/lia';
import { useRef, useEffect, useState } from 'react';
import { getUserInfo, updateUser } from '../../../api/UserAPI';

export default function EditForm() {
  const [image, setImage] = useState(''); //사진 update할때 쓰는 변수
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [name, setName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(profileImg); //frontend에서 사진 보여줄때 쓰는 변수

  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = sessionStorage.getItem('instock_user');

    if (userData) {
      const parsedData = JSON.parse(userData);
      const userId = parsedData.userId;
      updateUser(name, nickname, image, introduction, userId, previewUrl);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const userData = sessionStorage.getItem('instock_user');

    if (userData) {
      const parsedData = JSON.parse(userData);
      const userId = parsedData.userId;
      getUserInfo(userId).then((data) => {
        setPreviewUrl(data.imageUrl);
        setIntroduction(data.introduction);
        setName(data.name);
        setNickname(data.nickname);
      });
    }
  }, []);

  return (
    <form
      className="flex flex-col items-center gap-8 w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-3 mt-8">
        <div className="flex flex-col items-center w-30 h-30 rounded-full relative">
          <img
            src={previewUrl}
            className="w-30 h-30 rounded-full object-contain"
          />
          <LiaEditSolid
            onClick={handleClick}
            className="absolute bottom-1 right-1 text-white bg-gray-800 rounded-full p-2 cursor-pointer"
            size={35}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              setImage(e.target.files[0]);
              const imageUrl = URL.createObjectURL(e.target.files[0]);
              setPreviewUrl(imageUrl);
            }}
          />
        </div>
        <div>{JSON.parse(sessionStorage.getItem('instock_user')).userId}</div>
        <div>
          {JSON.parse(sessionStorage.getItem('instock_user')).introduction}
        </div>
      </div>
      <div className="flex  flex-col w-3/4">
        <label>Name</label>
        <input
          placeholder="이름을 입력하세요"
          className="border-1  border-stroke-gray p-2 rounded-md"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
      </div>
      <div className="flex  flex-col w-3/4">
        <label>Nickname</label>
        <input
          placeholder="nickname을 입력하세요"
          className="border-1  border-stroke-gray p-2 rounded-md"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        ></input>
      </div>
      <div className="flex  flex-col w-3/4">
        <label>Brief Introduction</label>
        <input
          placeholder="자기소개를 입력하세요"
          className="border-1  border-stroke-gray p-2 rounded-md"
          value={introduction}
          onChange={(e) => {
            setIntroduction(e.target.value);
          }}
        ></input>
      </div>
      <input
        type="submit"
        value="Done"
        className="bg-black text-center text-white rounded-2xl w-1/4 p-2"
      />
    </form>
  );
}
