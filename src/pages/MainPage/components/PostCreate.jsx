import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLogin } from '../../../hooks/useLogin';
import ImageMaker from '../../../utils/ImageMaker.jsx';
import Modal from '../../../components/common/Modal.jsx';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { IoCloseCircle } from 'react-icons/io5';
import { getHashtagList } from '../../../api/StockAPI.jsx';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { checkInfluencerStatus } from '../../../api/UserAPI';
import miniLogo from '/img/miniLogo.png';

export default function PostCreate() {
  const [postText, setPostText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [hashtag, setHashtag] = useState('');
  const [myStocks, setMyStocks] = useState([]); // 보유 주식 리스트 (보여줄 때)
  const [images, setImages] = useState([]); // 실제 파일 저장
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);
  const { userInfo } = useLogin();

  const handleKeyDown = (e) => {
    const key = e.key.normalize('NFC');

    if (key === '₩' || key === '\\') {
      getHashtagList(userInfo.userId).then((result) => {
        setMyStocks(result);
      });
    }
  };

  const handleInput = (e) => {
    const inputValue = e.target.value.normalize('NFC');

    setPostText(inputValue);
    if (!inputValue.includes('₩') && !inputValue.includes('\\')) {
      setMyStocks([]);
    }
  };

  // 🔥 주식 종목 선택 시 현재 커서 위치에 삽입하고 리스트 숨김
  const selectHashtag = (selectedStock) => {
    if (!textAreaRef.current) return;

    setHashtag(selectedStock);
    const cursorPosition = textAreaRef.current.selectionStart;
    const beforeText = postText.slice(0, cursorPosition);
    const afterText = postText.slice(cursorPosition);

    const newText = `${beforeText}${selectedStock} ${afterText}`;
    setPostText(newText);

    // 주식 리스트 숨기기
    setMyStocks([]);

    // 커서 위치를 선택된 종목 뒤로 이동
    setTimeout(() => {
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd =
        beforeText.length + selectedStock.length + 2; // ₩ + 주식명 + 공백
      textAreaRef.current.focus();
    }, 10);
  };

  const navigate = useNavigate();
  const [isInfluencer, setIsInfluencer] = useState(false);
  useEffect(() => {
    async function fetchInfluencerStatus() {
      if (userInfo?.nickname) {
        const isUserInfluencer = await checkInfluencerStatus(userInfo.nickname);
        setIsInfluencer(isUserInfluencer);
      }
    }
    fetchInfluencerStatus();
  }, [userInfo]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 1 || images.length >= 1) {
      alert('이미지는 1개만 업로드할 수 있습니다.');
      return;
    }

    const newPreviews = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));

    setImages(files);
    setImagePreviews(newPreviews);
  };

  const removeImage = (id) => {
    setImagePreviews([]);
    setImages([]);
  };

  const handlePostUpload = async () => {
    if (!postText.trim()) {
      alert('게시글 내용을 입력하세요!');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userInfo.userId);
    formData.append('content', postText);
    if (
      hashtag &&
      !postText.includes('₩' + hashtag) &&
      !postText.includes('\\' + hashtag)
    ) {
      formData.append('hashtag', ''); // 필요하면 해시태그 추가
    } else {
      formData.append('hashtag', hashtag); // 필요하면 해시태그 추가
    }

    if (images.length > 0) {
      formData.append('file', images[0]);
    }

    try {
      const res = await axios.post('http://localhost:8080/posts', formData, {
        headers: {
          Authorization: `Bearer ${userInfo.userId}`, // 필요 시 토큰 추가
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.isSuccess) {
        setIsModalOpen(false);
        setPostText('');
        setImagePreviews([]);
        setImages([]);

        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error('❌ 게시글 업로드 실패:', error);
      alert('게시글 업로드 중 오류가 발생했습니다.');
    }
  };

  const debouncedHandlePostUpload = debounce(handlePostUpload, 500);

  return (
    <div className="flex flex-row p-5 w-5/6">
      {/* 로그인 유저 프로필 이미지 */}
      <div className="flex py-3 flex-row items-start justify-center">
        {userInfo?.imageUrl ? (
          <div className="flex items-center justify-center w-[50px] h-[50px]">
            <img
              src={userInfo.imageUrl}
              alt="profile"
              className="rounded-full w-[50px] h-[50px]"
            />
          </div>
        ) : (
          <ImageMaker nickname={userInfo?.nickname || '유저'} />
        )}
      </div>

      {/* 게시글 작성 버튼 */}
      <div
        className="p-4 mx-4 border rounded-2xl w-full text-stroke-gray cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <input
          type="text"
          placeholder="게시글을 작성해 보세요 🐷"
          className="w-full text-gray-600 text-lg focus:outline-none"
          value={postText}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-5 w-full bg-white rounded-xl">
          {/* 로그인 유저 프로필 이미지 */}
          <div className="flex items-center gap-3">
            {userInfo?.imageUrl ? (
              <img
                src={userInfo.imageUrl}
                alt="User Profile"
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <ImageMaker nickname={userInfo?.nickname || 'User'} />
            )}
            <span className="text-lg font-semibold">
              {userInfo?.nickname}
              {isInfluencer && (
                <img
                  src={miniLogo}
                  className="w-5 h-5 ml-1"
                  alt="Influencer Badge"
                />
              )}
            </span>
          </div>

          {/* 게시글 입력 폼 */}
          <textarea
            ref={textAreaRef}
            value={postText}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="관련 주식 태그하려면 ₩을 붙여주세요! (예: ₩네이버)"
            className="text-xl w-full p-3 mt-3 border rounded-lg resize-none focus:outline-none"
            rows="6"
          ></textarea>

          {/* 보유 주식 리스트 (₩ 입력 시) */}
          {myStocks.length > 0 && (
            <div className="w-full flex flex-row gap-3 overflow-auto mt-2">
              {myStocks.map((stock, idx) => (
                <div
                  key={idx}
                  className="border border-stroke-gray px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200"
                  onClick={() => selectHashtag(stock.name || stock)}
                >
                  {stock.name || stock}
                </div>
              ))}
            </div>
          )}

          {/* 이미지 미리보기 및 삭제 버튼 */}
          {imagePreviews.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {imagePreviews.map(({ id, file }) => (
                <div key={id} className="relative">
                  <img src={id} alt="Preview" className="w-24 h-24" />
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
              onClick={() => fileInputRef.current.click()}
            >
              <MdOutlineAddPhotoAlternate className="w-8 h-8" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />

            {/* 게시글 업로드 버튼 */}
            <button
              className="bg-black text-white px-4 py-1 rounded-full"
              onClick={debouncedHandlePostUpload}
            >
              POST
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
