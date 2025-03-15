export default function Footer() {
  const handleOpenNoticePage = () => {
    window.open('/notice', '_self', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleOpenNoticePage}
      className="text-gray-500 hover:text-gray-300 transition duration-200"
    >
      <div>
        📢 Instock 안내사항
        <p className="text-gray-400 text-[0.8rem]">
          Instock은 신뢰할 수 있는 정보 제공을 목표로 하지만,
          <br /> 개별 투자에 대한 법적 책임을 지지 않습니다.
        </p>
      </div>
    </button>
  );
}
