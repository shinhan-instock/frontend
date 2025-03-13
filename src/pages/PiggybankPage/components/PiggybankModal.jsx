import { useEffect, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../../hooks/useLogin';
import WonFormatter from '../../../utils/WonFormatter';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { account } from '../../../api/UserAPI';

const BASE_URL = 'http://localhost:8081';

export default function PiggybankModal() {
  const navigate = useNavigate();
  const { userInfo } = useLogin();
  const [stocks, setStocks] = useState([]);
  const [isLinked, setIsLinked] = useState(false);
  const [eventSource, setEventSource] = useState(null);

  useEffect(() => {
    if (!userInfo?.userId) return;
    const checkAccountStatus = () => {
      account(
        userInfo,
        (data) => {
          if (data?.code === 'STOCK4004') {
            console.warn('📢 계좌 없음 (STOCK4004 감지)');
            setIsLinked(false);
          } else {
            setIsLinked(true);
          }
        },
        (error) => {
          setIsLinked(false);
        }
      );
    };

    checkAccountStatus();

    const connectSSE = () => {
      const es = new EventSourcePolyfill(`${BASE_URL}/stocks/pigs/stream`, {
        headers: {
          Authorization: `Bearer ${userInfo.userId}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      es.onopen = () => {};

      es.onmessage = (event) => {
        try {
          const newStocks = JSON.parse(event.data);
          setStocks(newStocks);
        } catch (error) {}
      };

      es.onerror = (error) => {
        es.close();
        setTimeout(connectSSE, 3000);
      };

      setEventSource(es);
    };

    connectSSE();

    return () => {
      eventSource?.close();
    };
  }, [userInfo]);

  const handleClose = () => {
    eventSource?.close();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center text-white p-5">
      <button
        className="absolute top-5 right-5 text-white text-3xl"
        onClick={handleClose}
      >
        <IoCloseCircle />
      </button>

      <h2 className="text-2xl font-bold mb-5">🔥 시가 총액 Top10 🔥</h2>

      <div className="w-full max-w-lg bg-white rounded-lg p-5 text-black shadow-lg">
        {stocks.length === 0 ? (
          <p className="text-center">📡 데이터를 불러오는 중...</p>
        ) : (
          <ul className="space-y-3">
            {stocks.map((stock, index) => (
              <TopResult
                key={index}
                stockName={stock.stockName}
                stockCode={stock.stockCode}
                price={stock.price}
                changeRate={stock.priceChange}
                isLinked={isLinked}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// `TopResult` 컴포넌트 추가 (주식 정보 UI)
function TopResult({ stockName, stockCode, price, changeRate, isLinked }) {
  const navigate = useNavigate();
  const handleStockClick = () => {
    if (isLinked) {
      navigate(`/stock/${stockName}`);
    } else {
      alert('⚠️ 계좌 연동이 필요합니다! 먼저 계좌를 연동해주세요.');
    }
  };

  return (
    <div
      className="flex flex-row justify-between items-center py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100 transition duration-200"
      onClick={handleStockClick}
    >
      <div className="flex flex-row gap-5">
        <img
          src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stockCode}.png`}
          className="w-12 h-12 rounded-full shadow-md object-cover"
        />

        <div className="flex flex-col">
          <div className="font-semibold">{stockName}</div>
          <div className="text-stroke-gray text-sm">{stockCode}</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div>{WonFormatter.format(price)}</div>
        {changeRate > 0 ? (
          <div className="text-red-500 text-sm"> + {changeRate} %</div>
        ) : (
          <div className="text-blue-500 text-sm">{changeRate} %</div>
        )}
      </div>
    </div>
  );
}
