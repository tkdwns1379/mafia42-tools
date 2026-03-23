import { useState } from 'react';

// 공식: -20 - 1.2 * sqrt(x)
function calcDamage(fame: number): number {
  return -(20 + 1.2 * Math.sqrt(fame));
}

const EXAMPLES = [100, 400, 900, 1600, 2500];

export default function Kwonyeop() {
  const [fame, setFame] = useState('');
  const fameNum = parseInt(fame);
  const valid = !isNaN(fameNum) && fameNum >= 0;
  const damage = valid ? calcDamage(fameNum) : null;

  return (
    <div className="page">
      <h1 className="page-title">✉️ 권엽 피해 계산기</h1>
      <p className="page-desc">
        권위의 엽서를 보낸 사람의 명성을 입력하면<br />
        상대방이 받는 명성 하락량을 계산합니다.
      </p>

      <div className="card">
        <div style={{
          background: 'rgba(248,113,113,0.08)',
          border: '1px solid rgba(248,113,113,0.3)',
          borderRadius: 10,
          padding: '12px 16px',
          marginBottom: 20,
          fontSize: 13,
          color: 'var(--text-muted)',
          lineHeight: 1.6,
        }}>
          📌 계산 공식: <strong style={{ color: 'var(--danger)' }}>-20 - 1.2 × √명성</strong>
          <br />지속 기간: 15일 / 우체통이 가득 차도 강제 수신
        </div>

        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">보내는 사람의 명성</label>
          <input
            className="input-field"
            type="number"
            placeholder="예: 400"
            value={fame}
            onChange={e => setFame(e.target.value)}
          />
        </div>
      </div>

      {damage !== null && valid && (
        <div className="result-box" style={{ borderColor: 'var(--danger)', background: 'rgba(248,113,113,0.1)' }}>
          <p className="result-label" style={{ color: 'var(--danger)' }}>명성 하락량</p>
          <p className="result-value" style={{ color: 'var(--danger)' }}>
            {Math.floor(damage).toLocaleString()} 명성
          </p>
          <p className="result-sub">
            정확한 값: {damage.toFixed(2)} / 명성 {fameNum.toLocaleString()}인 유저 발송 기준
          </p>
        </div>
      )}

      {fame && !valid && (
        <p className="hint" style={{ color: 'var(--danger)' }}>0 이상의 숫자를 입력해주세요.</p>
      )}

      <div className="card" style={{ marginTop: 16 }}>
        <p className="section-label">명성별 피해량 예시</p>
        <table className="info-table">
          <thead>
            <tr>
              <th>발송인 명성</th>
              <th style={{ textAlign: 'right' }}>명성 하락량</th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLES.map(ex => (
              <tr key={ex} className={fameNum === ex ? 'active-row' : ''}>
                <td>{ex.toLocaleString()}</td>
                <td style={{ textAlign: 'right', color: 'var(--danger)' }}>
                  {Math.floor(calcDamage(ex)).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="hint">
        ※ 권위의 엽서는 신비한 합창의 구슬을 통해서만 획득할 수 있습니다.
      </p>
    </div>
  );
}
