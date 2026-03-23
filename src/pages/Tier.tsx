import { useState } from 'react';

const TIERS = [
  { name: '우드',       min: 0,    max: 2999,    color: '#a16207', bg: 'rgba(161,98,7,0.15)' },
  { name: '브론즈',     min: 3000, max: 4499,    color: '#b45309', bg: 'rgba(180,83,9,0.15)' },
  { name: '실버',       min: 4500, max: 5999,    color: '#9ca3af', bg: 'rgba(156,163,175,0.15)' },
  { name: '골드',       min: 6000, max: 7499,    color: '#d97706', bg: 'rgba(217,119,6,0.15)' },
  { name: '플래티넘',   min: 7500, max: 8999,    color: '#22d3ee', bg: 'rgba(34,211,238,0.15)' },
  { name: '마스터',     min: 9000, max: 9499,    color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
  { name: '그랜드마스터', min: 9500, max: Infinity, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
];

function getTier(rp: number) {
  return TIERS.find(t => rp >= t.min && rp <= t.max) ?? TIERS[TIERS.length - 1];
}

export default function Tier() {
  const [rp, setRp] = useState('');
  const rpNum = parseInt(rp);
  const valid = !isNaN(rpNum) && rpNum >= 0;
  const tier = valid ? getTier(rpNum) : null;

  const progress = tier && tier.max !== Infinity
    ? Math.min(((rpNum - tier.min) / (tier.max - tier.min + 1)) * 100, 100)
    : tier ? 100 : 0;

  const toNext = tier && tier.max !== Infinity ? tier.max - rpNum + 1 : null;

  return (
    <div className="page">
      <h1 className="page-title">🏆 티어 계산기</h1>
      <p className="page-desc">
        현재 RP를 입력하면 티어와 다음 티어까지 필요한 RP를 계산합니다.
      </p>

      <div className="card">
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">현재 RP</label>
          <input
            className="input-field"
            type="number"
            placeholder="예: 6500"
            value={rp}
            onChange={e => setRp(e.target.value)}
          />
        </div>
      </div>

      {tier && valid && (
        <>
          <div className="result-box" style={{ borderColor: tier.color, background: tier.bg }}>
            <p className="result-label" style={{ color: tier.color }}>현재 티어</p>
            <p className="result-value">{tier.name}</p>
            <div className="progress-wrap" style={{ marginTop: 14 }}>
              <div
                className="progress-bar"
                style={{
                  width: `${progress}%`,
                  background: tier.max === Infinity ? tier.color : `linear-gradient(90deg, ${tier.color}99, ${tier.color})`,
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
              <span>{tier.min.toLocaleString()} RP</span>
              <span>{tier.max === Infinity ? '∞' : tier.max.toLocaleString() + ' RP'}</span>
            </div>
            {toNext !== null ? (
              <p className="result-sub" style={{ marginTop: 12 }}>
                다음 티어까지 <strong style={{ color: tier.color }}>{toNext.toLocaleString()} RP</strong> 필요
              </p>
            ) : (
              <p className="result-sub" style={{ marginTop: 12, color: tier.color }}>
                🎉 최상위 티어 달성!
              </p>
            )}
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <p className="section-label">티어 구간표</p>
            <table className="info-table">
              <thead>
                <tr>
                  <th>티어</th>
                  <th>RP 구간</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map(t => (
                  <tr key={t.name} className={t.name === tier.name ? 'active-row' : ''}>
                    <td>
                      <span className="tier-badge" style={{ background: t.bg, color: t.color }}>
                        {t.name}
                      </span>
                    </td>
                    <td style={{ color: t.name === tier.name ? t.color : 'var(--text-muted)' }}>
                      {t.min.toLocaleString()} ~ {t.max === Infinity ? '∞' : t.max.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!valid && rp && (
        <p className="hint" style={{ color: 'var(--danger)' }}>0 이상의 숫자를 입력해주세요.</p>
      )}

      {!rp && (
        <div className="card">
          <p className="section-label">티어 구간표</p>
          <table className="info-table">
            <thead>
              <tr><th>티어</th><th>RP 구간</th></tr>
            </thead>
            <tbody>
              {TIERS.map(t => (
                <tr key={t.name}>
                  <td>
                    <span className="tier-badge" style={{ background: t.bg, color: t.color }}>
                      {t.name}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>
                    {t.min.toLocaleString()} ~ {t.max === Infinity ? '∞' : t.max.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
