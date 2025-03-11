/* eslint-disable react/prop-types */

const color = ['bg-red-300', 'bg-yellow-400', 'bg-blue-300', 'bg-emerald-400'];

export default function ImageMaker({ nickname }) {
  const randomBg = nickname.length % 4;
  return (
    <div
      className={`flex items-center justify-center rounded-full ${color[randomBg]} text-white w-[50px] h-[50px]`}
    >
      {nickname.substring(0, 3)}
    </div>
  );
}
