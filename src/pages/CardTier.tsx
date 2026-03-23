import { useState } from 'react';

type TargetTier = 5 | 6;

function calculate(
  target: TargetTier,
  has3: number,
  has4: number,
  has5: number,
  discount: boolean,
) {
  const k = discount ? 0.9 : 1.0;

  if (target === 5) {
    const need4 = Math.max(5 - has4, 0);
    const need3 = Math.max(20 - has4 * 4, 0);
    const cost34 = Math.ceil(Math.max(20 - has4 * 4, 0) / 4) * 100000 * k;
    const cost5base = 500000 * k;
    return {
      need3,
      need4,
      need5: null,
      cost34,
      cost45: null,
      costBase: cost5base,
      total: cost34 + cost5base,
    };
  } else {
    const need5 = Math.max(6 - has5, 0);
    const need4 = Math.max(need5 * 5 - has4, 0);
    const need3 = Math.max(need4 * 4 - has3, 0);
    const cost34 = Math.ceil(Math.max((6 - has5) * 5 * 4 - has4 * 4 - has3, 0) / 4) * 100000 * k;
    const cost45 = Math.ceil(Math.max((6 - has5) * 5 - has4, 0) / 5) * 500000 * k;
    const cost6base = 1000000 * k;
    return {
      need3,
      need4,
      need5,
      cost34,
      cost45,
      costBase: cost6base,
      total: cost34 + cost45 + cost6base,
    };
  }
}

function fmt(n: number) {
  return Math.round(n).toLocaleString();
}

export default function CardTier() {
  const [target, setTarget] = useState<TargetTier>(5);
  const [has3, setHas3] = useState('');
  const [has4, setHas4] = useState('');
  const [has5, setHas5] = useState('');
  const [discount, setDiscount] = useState(false);

  const n3 = Math.max(0, parseInt(has3) || 0);
  const n4 = Math.max(0, parseInt(has4) || 0);
  const n5 = Math.max(0, parseInt(has5) || 0);

  const result = calculate(target, n3, n4, n5, discount);

  function reset() {
    setHas3('');
    setHas4('');
    setHas5('');
    setDiscount(false);
    setTarget(5);
  }

  return (
    <div className="page">
      <h1 className="page-title">🃏 카드 강화 계산기</h1>
      <p className="page-desc">
        보유 카드 수를 입력하면 목표 티어까지<br />
        필요한 카드와 강화 비용을 계산합니다.
      </p>

      <div className="card">
        {/* 목표 티어 */}
        <div className="input-group">
          <label className="input-label">목표 티어</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {([5, 6] as TargetTier[]).map(t => (
              <button
                key={t}
                onClick={() => setTarget(t)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 10,
                  border: `2px solid ${target === t ? 'var(--accent)' : 'var(--border)'}`,
                  background: target === t ? 'var(--accent-soft)' : 'var(--bg-input)',
                  color: target === t ? 'var(--accent)' : 'var(--text-muted)',
                  fontWeight: target === t ? 700 : 400,
                  fontSize: 15,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {t}티어
              </button>
            ))}
          </div>
        </div>

        {/* 보유 카드 */}
        <div className="input-group">
          <label className="input-label">보유 중인 3티어 카드 수</label>
          <input
            className="input-field"
            type="number"
            placeholder="0"
            value={has3}
            onChange={e => setHas3(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">보유 중인 4티어 카드 수</label>
          <input
            className="input-field"
            type="number"
            placeholder="0"
            value={has4}
            onChange={e => setHas4(e.target.value)}
          />
        </div>
        {target === 6 && (
          <div className="input-group">
            <label className="input-label">보유 중인 5티어 카드 수</label>
            <input
              className="input-field"
              type="number"
              placeholder="0"
              value={has5}
              onChange={e => setHas5(e.target.value)}
            />
          </div>
        )}

        {/* 할인 체크 */}
        <div
          onClick={() => setDiscount(!discount)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 16px',
            background: discount ? 'var(--accent-soft)' : 'var(--bg-input)',
            border: `1px solid ${discount ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 10,
            cursor: 'pointer',
            transition: 'all 0.15s',
            marginBottom: 20,
          }}
        >
          <div style={{
            width: 18, height: 18,
            borderRadius: 5,
            border: `2px solid ${discount ? 'var(--accent)' : 'var(--border)'}`,
            background: discount ? 'var(--accent)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.15s',
          }}>
            {discount && <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</span>}
          </div>
          <span style={{ fontSize: 14, color: discount ? 'var(--accent)' : 'var(--text-muted)' }}>
            10% 할인 테두리 적용
          </span>
        </div>

        {/* 버튼 */}
        <button
          onClick={reset}
          style={{
            width: '100%',
            padding: '11px 0',
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text-muted)',
            fontSize: 14,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          초기화
        </button>
      </div>

      {/* 결과 */}
      <div className="card">
        <p className="section-label">계산 결과</p>

        <table className="info-table" style={{ marginBottom: 16 }}>
          <tbody>
            <tr>
              <td style={{ color: 'var(--text-muted)' }}>필요 3티어 카드</td>
              <td style={{ textAlign: 'right', fontWeight: 700 }}>{fmt(result.need3)}장</td>
            </tr>
            {result.need5 !== null && (
              <tr>
                <td style={{ color: 'var(--text-muted)' }}>필요 4티어 카드</td>
                <td style={{ textAlign: 'right', fontWeight: 700 }}>{fmt(result.need4)}장</td>
              </tr>
            )}
            <tr>
              <td style={{ color: 'var(--text-muted)' }}>3→4티어 강화 비용</td>
              <td style={{ textAlign: 'right', color: 'var(--warn)', fontWeight: 700 }}>
                {fmt(result.cost34)} 루블
              </td>
            </tr>
            {result.cost45 !== null && (
              <tr>
                <td style={{ color: 'var(--text-muted)' }}>4→5티어 강화 비용</td>
                <td style={{ textAlign: 'right', color: 'var(--warn)', fontWeight: 700 }}>
                  {fmt(result.cost45)} 루블
                </td>
              </tr>
            )}
            <tr>
              <td style={{ color: 'var(--text-muted)' }}>{target}티어 기본 강화 비용</td>
              <td style={{ textAlign: 'right', color: 'var(--warn)', fontWeight: 700 }}>
                {fmt(result.costBase)} 루블
              </td>
            </tr>
          </tbody>
        </table>

        <div className="result-box">
          <p className="result-label">총 강화 비용</p>
          <p className="result-value">{fmt(result.total)} 루블</p>
          {discount && (
            <p className="result-sub">10% 할인 테두리 적용됨</p>
          )}
        </div>
      </div>

      {/* 강화 구조 안내 */}
      <div className="card">
        <p className="section-label">카드 강화 구조</p>
        <table className="info-table">
          <tbody>
            <tr>
              <td style={{ color: 'var(--text-muted)' }}>3티어 4장</td>
              <td>→ 4티어 1장</td>
              <td style={{ textAlign: 'right', color: 'var(--warn)' }}>100,000 루블</td>
            </tr>
            <tr>
              <td style={{ color: 'var(--text-muted)' }}>4티어 5장</td>
              <td>→ 5티어 1장</td>
              <td style={{ textAlign: 'right', color: 'var(--warn)' }}>500,000 루블</td>
            </tr>
            <tr>
              <td style={{ color: 'var(--text-muted)' }}>5티어 6장</td>
              <td>→ 6티어 1장</td>
              <td style={{ textAlign: 'right', color: 'var(--warn)' }}>1,000,000 루블</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
