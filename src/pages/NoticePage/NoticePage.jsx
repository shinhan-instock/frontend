import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const notices = [
  {
    title: '📍 투자 판단은 신중하게!',
    content:
      '📍 Instock은 신뢰할 수 있는 정보를 제공하기 위해 노력하지만, 게시된 모든 내용이 100% 정확하다고 보장할 수 없습니다.\n📍 투자를 결정하기 전에 반드시 여러 정보를 교차 검증하세요.',
    color: 'text-blue-400',
  },
  {
    title: '🚨 사기 주의! 개인 연락처 공유 금지',
    content:
      '🚨 특정 종목 유도, 고수익 보장 등의 개인 연락처가 남긴 댓글&게시글을 받았다면 경계하세요.\n🚨 외부 링크를 통한 투자 유도는 사기일 가능성이 높습니다.',
    color: 'text-red-400',
  },
  {
    title: '🕵️ 익명 정보도 검증 필수!',
    content:
      '🚨 계좌를 공개하지 않은 상태에서 수익률을 언급하는 정보는 신뢰성을 보장할 수 없습니다.\n 🚨 감정적인 판단을 배제하고 객관적인 데이터와 사실 기반 분석을 우선하세요.\n',
    color: 'text-green-400',
  },
  {
    title: '💸 투자는 본인의 책임!',
    content:
      '📢 모든 투자 결정은 이용자의 독자적인 판단에 따라 이루어지며, 이에 따른 손실 또는 이익에 대한 책임은 전적으로 투자자 본인에게 있습니다. \n 📢 Instock은 투자 조언을 제공하지 않으며, 투자로 인한 재정적 손실에 대해 법적 책임을 부담하지 않습니다. 신중한 판단을 바랍니다.',
    color: 'text-yellow-400',
  },
  {
    title: '❌ 관리자가 절대 투자 권유를 하지 않습니다',
    content:
      '⚠️ Instock 운영진 및 관리자는 절대 개별 종목에 대한 투자 권유나 금전적 거래글을 올리지 않습니다.\n',
    color: 'text-purple-400',
  },
];

export default function NoticePage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-3">
      <div className="bg-gray-900 text-white py-10 px-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2">
          📢 Instock 안내사항
        </h2>
        <h3 className="mb-6">
          Instock은 신뢰할 수 있는 정보 제공을 목표로 하지만, 개별 투자에 대한
          법적 책임을 지지 않습니다.
        </h3>
        <div className="space-y-8 justify-center">
          {notices.map((notice, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md border border-gray-700"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex items-center justify-between w-full p-4 focus:outline-none"
              >
                <span className={`text-lg font-semibold ${notice.color}`}>
                  {notice.title}
                </span>
                {openIndex === index ? (
                  <FaChevronUp className="text-gray-300" />
                ) : (
                  <FaChevronDown className="text-gray-300" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 text-gray-300 border-t border-gray-700">
                  {notice.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
