import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageMaker from "../../../utils/ImageMaker";
import axios from "axios";
import { useLogin } from "../../../hooks/useLogin";
export default function CardSlider() {
  const { userInfo } = useLogin();
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    async function fetchInfluencers() {
      try {
        const response = await axios.get(
          "http://localhost:8080/users/influencer"
        );
        if (response.data.isSuccess) {
          setInfluencers(response.data.result);
        }
      } catch (error) {
        console.error("인플루언서 데이터를 불러오는데 실패했습니다.", error);
      }
    }
    fetchInfluencers();
  }, []);

  return (
    <div className="overflow-hidden w-full py-4 relative">
      <div className="flex w-max animate-scroll gap-5">
        {[...influencers, ...influencers].map((influencer, idx) => (
          <div
            key={idx}
            className="cursor-pointer flex flex-col items-center"
            onClick={() => {
              if (influencer.nickname === userInfo.nickname) {
                navigate("/myprofile");
              } else {
                navigate(`/profile/${influencer.nickname}`);
              }
            }}
          >
            {influencer.imageUrl ? (
              <img
                src={influencer.imageUrl}
                className="w-[50px] h-[50px] rounded-full shadow-lg"
                alt={influencer.nickname}
              />
            ) : (
              <ImageMaker nickname={influencer.nickname} />
            )}
            <p className="text-xs mt-2">{influencer.nickname}</p>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
