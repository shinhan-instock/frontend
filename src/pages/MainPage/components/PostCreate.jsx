import { useState, useRef } from 'react';
import { useLogin } from '../../../hooks/useLogin';
import ImageMaker from '../../../utils/ImageMaker.jsx';
import Modal from '../../../components/common/Modal.jsx';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { IoCloseCircle } from 'react-icons/io5';

export default function PostCreate() {
  const [postText, setPostText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const { userInfo } = useLogin();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); 
    const newImagePreviews = files.map((file) => ({
      id: URL.createObjectURL(file), 
      file, 
    }));

    setImagePreviews((prevImages) => [...prevImages, ...newImagePreviews]); 
  };
  const removeImage = (id) => {
    setImagePreviews((prevImages) => prevImages.filter((img) => img.id !== id));
  };

  return (
    <div className="flex flex-row p-5 w-5/6">
      {/* 로그인 유저 프로필 이미지 */}
      {userInfo?.imageUrl ? (
        <img
          src={userInfo.imageUrl}
          alt="User Profile"
          className="w-20 h-20 rounded-full object-contain"
        />
      ) : (
        <ImageMaker nickname={userInfo?.nickname || 'User'} />
      )}

      <div
        className="p-4 mx-4 border rounded-2xl w-full text-stroke-gray cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <input
          type="text"
          placeholder="게시글을 작성해 보세요 🐷"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="w-full text-gray-600 text-lg focus:outline-none"
          readOnly // 클릭 시 모달에서 입력하도록 변경
        />
      </div>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-5 w-full bg-white rounded-xl">
          <h2 className="text-xl font-bold mb-4">새 게시글 작성</h2>

          {/* 로그인 유저 프로필 이미지 */}
          <div className="flex items-center gap-3">
            {userInfo?.imageUrl ? (
              <img
                src={userInfo.imageUrl}
                alt="User Profile"
                className="w-16 h-16 rounded-full object-contain"
              />
            ) : (
              <ImageMaker nickname={userInfo?.nickname || 'User'} />
            )}
            <span className="text-lg font-semibold">{userInfo?.nickname}</span>
          </div>

          {/* 게시글 입력 폼 */}
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="관련 주식 태그하려면 ₩을 붙여주세요! (예: ₩네이버)"
            className="text-xl w-full p-3 mt-3 border rounded-lg resize-none focus:outline-none"
            rows="10"
          ></textarea>

          {/* 이미지 미리보기 및 삭제 버튼 */}
          {imagePreviews.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {imagePreviews.map(({ id, file }) => (
                <div key={id} className="relative">
                  <img
                    src={id}
                    alt="Preview"
                    className="w-24 h-24 object-contain "
                  />
                  <button
                    onClick={() => removeImage(id)}
                    className="absolute top-1 right-1 bg-gray-800 text-white p-1 rounded-full"
                  >
                    <IoCloseCircle size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 첨부 및 업로드 버튼 */}
          <div className="flex justify-between items-center mt-3">
            {/* 파일 업로드 버튼 */}
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => fileInputRef.current.click()} // 버튼 클릭 시 파일 업로드 창 열기
            >
              <MdOutlineAddPhotoAlternate className="w-8 h-8" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              multiple // 여러 개 파일 선택 가능
              accept="image/*" // 이미지 파일만 허용
            />

            {/* 게시글 업로드 버튼 */}
            <button
              className="bg-black text-white px-4 py-1 rounded-full"
              onClick={() => setIsModalOpen(false)}
            >
              POST
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
