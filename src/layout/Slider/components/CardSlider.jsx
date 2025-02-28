import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import piggyImg from "/img/piggyImg.jpg";
import emotion from "/img/emotion1.jpg";
import piggyBank from "/img/piggybank.png";
import { useNavigate } from "react-router-dom";

const carouselList = [
  { id: 1, src: piggyImg, link: "/piggybank" },
  { id: 2, src: emotion, link: "/stock/123" },
  { id: 3, src: piggyBank, link: "/myprofile" },
];

export default function Carousel() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {carouselList.map((item) => (
          <SwiperSlide
            key={item.id}
            onClick={() => {
              navigate(`${item.link}`);
            }}
          >
            <div className="flex justify-center items-center h-full w-full bg-white rounded-2xl">
              <img
                src={item.src}
                className="object-scale-down h-full w-full rounded-2xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
