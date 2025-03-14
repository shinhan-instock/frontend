import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLogin } from "../../../hooks/useLogin";
import ImageMaker from "../../../utils/ImageMaker.jsx";
import Modal from "../../../components/common/Modal.jsx";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { getHashtagList } from "../../../api/StockAPI.jsx";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { checkInfluencerStatus } from "../../../api/UserAPI";
import miniLogo from "/img/miniLogo.png";
const BASE_URL = "https://api.inst00ck.shop";

export default function PostCreate() {
  const [postText, setPostText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [myStocks, setMyStocks] = useState([]);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);
  const { userInfo } = useLogin();

  const handleKeyDown = (e) => {
    const key = e.key.normalize("NFC");

    if (key === "₩" || key === "\\") {
      getHashtagList(userInfo.userId).then((result) => {
        setMyStocks(result);
      });
    }
  };

  const handleInput = (e) => {
    const inputValue = e.target.value.normalize("NFC");

    setPostText(inputValue);
    if (!inputValue.includes("₩") && !inputValue.includes("\\")) {
      setMyStocks([]);
    }
  };

  const selectHashtag = (selectedStock) => {
    if (!textAreaRef.current) return;

    setHashtag(selectedStock);
    const cursorPosition = textAreaRef.current.selectionStart;
    const beforeText = postText.slice(0, cursorPosition);
    const afterText = postText.slice(cursorPosition);

    const newText = `${beforeText}${selectedStock} ${afterText}`;
    setPostText(newText);
    setMyStocks([]);
    setTimeout(() => {
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd =
        beforeText.length + selectedStock.length + 2;
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
      alert("이미지는 1개만 업로드할 수 있습니다.");
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
      alert("게시글 내용을 입력하세요!");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userInfo.userId);
    formData.append("content", postText);
    if (
      hashtag &&
      !postText.includes("₩" + hashtag) &&
      !postText.includes("\\" + hashtag)
    ) {
      formData.append("hashtag", "");
    } else {
      formData.append("hashtag", hashtag);
    }

    if (images.length > 0) {
      formData.append("file", images[0]);
    }

    try {
      const res = await axios.post(`${BASE_URL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${userInfo.userId}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.isSuccess) {
        setIsModalOpen(false);
        setPostText("");
        setImagePreviews([]);
        setImages([]);

        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error("❌ 게시글 업로드 실패:", error);
      alert("게시글 업로드 중 오류가 발생했습니다.");
    }
  };

  const debouncedHandlePostUpload = debounce(handlePostUpload, 500);

  return (
    <div className="flex flex-row p-5 w-5/6">
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
          <ImageMaker nickname={userInfo?.nickname || "유저"} />
        )}
      </div>

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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-5 w-full bg-white rounded-xl">
          <div className="flex items-center gap-3">
            {userInfo?.imageUrl ? (
              <img
                src={userInfo.imageUrl}
                alt="User Profile"
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <ImageMaker nickname={userInfo?.nickname || "User"} />
            )}
            <div className="text-lg font-semibold flex flex-row items-center">
              {userInfo?.nickname}
              {isInfluencer && (
                <img
                  src={miniLogo}
                  className="w-5 h-5 ml-1"
                  alt="Influencer Badge"
                />
              )}
            </div>
          </div>

          <textarea
            ref={textAreaRef}
            value={postText}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="관련 주식 태그하려면 ₩을 붙여주세요! (예: ₩네이버)"
            className="text-xl w-full p-3 mt-3 border rounded-lg resize-none focus:outline-none"
            rows="6"
          ></textarea>

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

          <div className="flex justify-between items-center mt-3">
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
