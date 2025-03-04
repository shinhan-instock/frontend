import profileImg from "/img/userImg.png";
import { LiaEditSolid } from "react-icons/lia";
import { useRef, useState } from "react";
export default function EditForm() {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <form className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-3 mt-8">
        <div className="flex flex-col items-center w-30 h-30 rounded-full relative">
          <img src={profileImg} className="w-full h-full rounded-full" />
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
              console.log(e.target.files[0]);
            }}
          />
        </div>
        <div>기존 닉네임</div>
        <div>기존 설명</div>
      </div>
      <div className="flex  flex-col w-3/4">
        <label>Name</label>
        <input
          placeholder="기존 이름"
          className="border-1  border-stroke-gray p-2 rounded-md"
        ></input>
      </div>
      <div className="flex  flex-col w-3/4">
        <label>Nickname</label>
        <input
          placeholder="기존 닉네임"
          className="border-1  border-stroke-gray p-2 rounded-md"
        ></input>
      </div>
      <div className="flex  flex-col w-3/4">
        <label>Brief Introduction</label>
        <input
          placeholder="기존 소개"
          className="border-1  border-stroke-gray p-2 rounded-md"
        ></input>
      </div>
      <input
        type="submit"
        value="Done"
        className="bg-black text-center text-white rounded-2xl w-1/4 p-2"
      />
      <button className="bg-instock-gray text-center  text-red-500 rounded-2xl w-1/4 p-2">
        계정 삭제
      </button>
    </form>
  );
}
