import { useState } from 'react';

interface Item {
  name: string;
  min: number;
  max: number;
  prob: number;
  unique: boolean; // 중복 소유 불가 아이템
  note?: string;
}

const ITEMS: Item[] = [
  // 확률 3%
  { name: '최후의 심판 청부업자 스킨', min: 1, max: 1, prob: 3, unique: true },
  { name: '개화하는 신세계의 교주 스킨', min: 1, max: 1, prob: 3, unique: true },
  // 확률 2.5%
  { name: '창세기 외전', min: 1, max: 1, prob: 2.5, unique: true },
  // 확률 2.2%
  { name: '심연 속 시선 테두리', min: 1, max: 1, prob: 2.2, unique: true },
  { name: '은제 구속구 테두리', min: 1, max: 1, prob: 2.2, unique: true },
  { name: '발아하는 재앙', min: 1, max: 1, prob: 2.2, unique: true },
  { name: '백은 묵주', min: 1, max: 1, prob: 2.2, unique: true },
  // 확률 0.6%
  { name: '종언의 마피아 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '잠입 심문관 최면술사 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '학살자 테두리', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '금색의 추 테두리', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '잔혹한 표장', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '성스러운 대들보', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '무도회의 꽃 스파이 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '무도회의 신사 경찰 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '생크림 케이크', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '성대한 파티 테두리', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '10주년 케이크 테두리', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '파티의 중심', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '불확실한 끝 마피아 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '반복되는 시작 의사 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '변혁의 의지 테두리', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '안내자의 테두리', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '심연 속의 흐름', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '종말으로의 비행', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '셰퍼드 잠옷 경찰 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '허스키 잠옷 도둑 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '3주년 기념 마피아 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '추억의 영화감독 기자 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '추억의 영화배우 마담 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '흥신소 상담실장 마녀 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '흥신소장 사립탐정 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '쇼퍼홀릭 영매 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '영앤리치 도둑 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '지름신 테두리', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '호화로운 액자 테두리', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '추억의 필름 테두리', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '접근 금지선 테두리', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '3주년 기념 명패', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '명예 흥신소 단원 명패', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '부의 대물림', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '아타셰 케이스', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '가정교사 공무원 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '레이디 마담 스킨', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '녹슨 장미 테두리', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '파티용 드레스 테두리', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '말린 장미 회랑', min: 1, max: 1, prob: 0.6, unique: true },
  { name: '고귀한 예법', min: 1, max: 1, prob: 0.6, unique: true },
  // 확률 0.4%
  { name: '고풍스러운 살생부', min: 1, max: 1, prob: 0.4, unique: true },
  { name: '생크림 리본 지갑', min: 1, max: 1, prob: 0.4, unique: true },
  { name: '시간 여행자의 지갑', min: 1, max: 1, prob: 0.4, unique: true },
  { name: '체크무늬 패턴 지갑', min: 1, max: 1, prob: 0.4, unique: true },
  { name: '일급기밀 개굴 수첩', min: 1, max: 1, prob: 0.4, unique: true },
  { name: '저택의 비밀 명부', min: 1, max: 1, prob: 0.4, unique: true },
  { name: '신비한 합창', min: 1, max: 1, prob: 0.4, unique: true },
  // 확률 2.8% (소모품)
  { name: '마법의 염색약', min: 25, max: 27, prob: 2.8, unique: false },
  { name: '깜짝 엽서', min: 9, max: 11, prob: 2.8, unique: false },
  { name: '징벌의 엽서', min: 8, max: 9, prob: 2.8, unique: false },
  { name: '주사위 엽서', min: 16, max: 18, prob: 2.8, unique: false },
  { name: '3티어 카드', min: 4, max: 5, prob: 2.8, unique: false },
  { name: '4티어 카드', min: 1, max: 1, prob: 2.8, unique: false },
  { name: '4티어 스킬 변경권', min: 2, max: 2, prob: 2.8, unique: false },
  // 확률 5.1% (소모품)
  { name: '고급스러운 연회장 장식', min: 11, max: 15, prob: 5.1, unique: false, note: '수량 = 사용 가능 일수' },
  { name: '10주년 기념 엽서', min: 40, max: 45, prob: 5.1, unique: false },
  { name: '10주년 확성기', min: 25, max: 30, prob: 5.1, unique: false },
  { name: '추천장', min: 50, max: 60, prob: 5.1, unique: false },
  { name: '4주년 기념 엽서', min: 7, max: 10, prob: 5.1, unique: false },
  { name: '달조각', min: 8, max: 10, prob: 5.1, unique: false },
  { name: '강화 확성기', min: 25, max: 30, prob: 5.1, unique: false },
];

function calcAdjustedProbs(owned: Set<number>) {
  // 보유한 아이템의 확률 합계
  const removedProb = ITEMS.reduce((sum, item, i) =>
    item.unique && owned.has(i) ? sum + item.prob : sum, 0);

  // 남은 아이템들의 원래 확률 합계
  const remainProb = 100 - removedProb;

  return ITEMS.map((item, i) => {
    if (item.unique && owned.has(i)) return 0;
    if (remainProb === 0) return 0;
    return (item.prob / remainProb) * 100;
  });
}

function qtyLabel(item: Item) {
  if (item.min === item.max) return `${item.min}개`;
  return `${item.min}~${item.max}개`;
}

export default function BoxGacha() {
  const [owned, setOwned] = useState<Set<number>>(new Set());
  const [showOwned, setShowOwned] = useState(false);

  const toggle = (i: number) => {
    setOwned(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const adjustedProbs = calcAdjustedProbs(owned);
  const uniqueItems = ITEMS.filter(item => item.unique);
  const consumableItems = ITEMS.filter(item => !item.unique);

  const removedProb = ITEMS.reduce((sum, item, i) =>
    item.unique && owned.has(i) ? sum + item.prob : sum, 0);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px 40px' }}>
      <h2 style={{ marginBottom: 4 }}>상자깡 확률</h2>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 6 }}>
        세뇌의 성물함 · 판매 기간 ~2026.04.06 23:59
      </p>
      <p style={{ color: '#facc15', fontSize: 12, marginBottom: 24, lineHeight: 1.6 }}>
        이미 보유한 중복불가 아이템을 체크하면 나머지 아이템의 확률이 자동으로 재계산됩니다.
      </p>

      {/* 보유 아이템 체크 */}
      <div style={{
        background: '#1a1d27', border: '1px solid #2e3248',
        borderRadius: 12, padding: '16px', marginBottom: 24,
      }}>
        <button
          onClick={() => setShowOwned(o => !o)}
          style={{
            width: '100%', display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', background: 'none', border: 'none',
            cursor: 'pointer', color: '#e8e9f0', fontWeight: 700, fontSize: 14,
          }}
        >
          <span>보유 아이템 선택 (중복불가) {owned.size > 0 && <span style={{ color: '#7c6af7' }}>· {owned.size}개 선택됨</span>}</span>
          <span style={{ color: '#8b8fa8', fontSize: 12 }}>{showOwned ? '▲' : '▼'}</span>
        </button>

        {showOwned && (
          <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {uniqueItems.map((item, idx) => {
              const globalIdx = ITEMS.indexOf(item);
              const isOwned = owned.has(globalIdx);
              return (
                <button
                  key={item.name}
                  onClick={() => toggle(globalIdx)}
                  style={{
                    padding: '6px 12px', borderRadius: 20, fontSize: 12,
                    border: `1px solid ${isOwned ? '#7c6af7' : '#2e3248'}`,
                    background: isOwned ? 'rgba(124,106,247,0.2)' : 'transparent',
                    color: isOwned ? '#7c6af7' : '#8b8fa8',
                    cursor: 'pointer', fontWeight: isOwned ? 700 : 400,
                  }}
                >
                  {isOwned ? '✓ ' : ''}{item.name}
                </button>
              );
            })}
          </div>
        )}

        {owned.size > 0 && (
          <div style={{ marginTop: 12, fontSize: 12, color: '#8b8fa8' }}>
            제외된 확률: <span style={{ color: '#f87171' }}>{removedProb.toFixed(2)}%</span>
            {' → '}나머지 아이템 확률이 <span style={{ color: '#4ade80' }}>×{(100 / (100 - removedProb)).toFixed(3)}</span> 배율로 증가
          </div>
        )}
      </div>

      {/* 중복불가 아이템 확률표 */}
      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#aaa', marginBottom: 12 }}>중복불가 아이템</h3>
      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#1a1d27' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '1px solid #2e3248', color: '#000', background: '#e8e9f0' }}>아이템</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '1px solid #2e3248', color: '#000', background: '#e8e9f0', whiteSpace: 'nowrap' }}>기본 확률</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '1px solid #2e3248', color: '#000', background: '#e8e9f0', whiteSpace: 'nowrap' }}>조정 확률</th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((item, i) => {
              if (!item.unique) return null;
              const isOwned = owned.has(i);
              const adj = adjustedProbs[i];
              return (
                <tr
                  key={item.name}
                  style={{
                    background: isOwned ? 'rgba(248,113,113,0.08)' : 'transparent',
                    opacity: isOwned ? 0.5 : 1,
                  }}
                >
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid #1e2130', color: isOwned ? '#f87171' : '#e8e9f0' }}>
                    {isOwned ? <s>{item.name}</s> : item.name}
                  </td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid #1e2130', textAlign: 'center', color: '#8b8fa8' }}>
                    {item.prob}%
                  </td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid #1e2130', textAlign: 'center', color: isOwned ? '#f87171' : '#4ade80', fontWeight: 600 }}>
                    {isOwned ? '보유중' : `${adj.toFixed(3)}%`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 소모품 확률표 */}
      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#aaa', marginBottom: 12 }}>소모품 아이템</h3>
      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '1px solid #2e3248', color: '#000', background: '#e8e9f0' }}>아이템</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '1px solid #2e3248', color: '#000', background: '#e8e9f0', whiteSpace: 'nowrap' }}>수량</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '1px solid #2e3248', color: '#000', background: '#e8e9f0', whiteSpace: 'nowrap' }}>기본 확률</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '1px solid #2e3248', color: '#000', background: '#e8e9f0', whiteSpace: 'nowrap' }}>조정 확률</th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((item, i) => {
              if (item.unique) return null;
              const adj = adjustedProbs[i];
              return (
                <tr key={item.name}>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid #1e2130', color: '#e8e9f0' }}>
                    {item.name}
                    {item.note && <span style={{ fontSize: 11, color: '#facc15', marginLeft: 6 }}>({item.note})</span>}
                  </td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid #1e2130', textAlign: 'center', color: '#8b8fa8' }}>
                    {qtyLabel(item)}
                  </td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid #1e2130', textAlign: 'center', color: '#8b8fa8' }}>
                    {item.prob}%
                  </td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid #1e2130', textAlign: 'center', color: '#4ade80', fontWeight: 600 }}>
                    {adj.toFixed(3)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 안내 */}
      <div style={{ background: '#1a1d27', border: '1px solid #2e3248', borderRadius: 10, padding: 16, fontSize: 12, color: '#8b8fa8', lineHeight: 1.8 }}>
        <div style={{ fontWeight: 700, color: '#e8e9f0', marginBottom: 8 }}>안내</div>
        <div>· 아이템은 최소~최대 수량 사이에서 각 수량별 동일한 확률로 획득</div>
        <div>· 예) 10% 확률 / 수량 1~2개 → 1개 획득 5%, 2개 획득 5%</div>
        <div>· 이미 보유한 중복불가 아이템은 해당 확률만큼 나머지 아이템에 비례 분배</div>
        <div>· 고급스러운 연회장 장식의 수량은 사용 가능 일수</div>
      </div>
    </div>
  );
}
