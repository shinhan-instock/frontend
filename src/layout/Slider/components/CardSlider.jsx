import { useNavigate } from 'react-router-dom';

import image1 from '/img/image1.png';
import image2 from '/img/image2.png';
import image3 from '/img/image3.png';
import image4 from '/img/image4.png';
import image5 from '/img/image5.png';
import image6 from '/img/image6.png';
import image7 from '/img/image7.png';

const carouselList = [
  { id: 1, src: image1, link: '/piggybank' },
  { id: 2, src: image2, link: '/stock/123' },
  { id: 3, src: image3, link: '/myprofile' },
  { id: 4, src: image4, link: '/piggybank' },
  { id: 5, src: image5, link: '/piggybank' },
  { id: 6, src: image6, link: '/piggybank' },
  { id: 7, src: image7, link: '/piggybank' },
];

export default function TrainSlider() {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden w-full py-4 relative">
      <div className="flex w-max animate-scroll gap-5">
        {[...carouselList, ...carouselList].map((item, idx) => (
          <div
            key={idx}
            className="cursor-pointer"
            onClick={() => navigate(item.link)}
          >
            <img
              src={item.src}
              className="w-20 h-20 rounded-full shadow-lg object-cover"
              alt="carousel-item"
            />
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
