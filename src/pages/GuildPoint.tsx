import { useState } from 'react';

const A = 0.350963;
const B = 0.0019069;
const C = 0.000046570;
const D = 0.239713;
const E = 3062.13;

function calcGP(rank: number, fame: number, activity: number, power: number) {
  return A * rank + B * fame + C * activity + D * power + E;
}

export default function GuildPoint() {
  const [rank, setRank] = useState('');
  const [fame, setFame] = useState('');
  const [activity, setActivity] = useState('');
  const [power, setPower] = useState('');

  const r = parseFloat(rank);
  const f = parseFloat(fame);
  const a = parseFloat(activity);
  const p = parseFloat(power);
  const isValid = [r, f, a, p].every(v => !isNaN(v) && v >= 0);
  const gp = isValid ? calcGP(r, f, a, p) : null;

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: 8,
    border: '1px solid #2e3248', fontSize: 16, boxSizing: 'border-box' as const,
    background: '#232635', color: '#e8e9f0', outline: 'none',
  };

  const labelStyle = {
    display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14,
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 40px' }}>
      <h2 style={{ marginBottom: 4 }}>길드포인트 계산기</h2>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 24 }}>
        랭크 · 명성 · 활동 · 전투력을 입력하면 길드포인트를 예측합니다.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {[
          { label: '랭크', value: rank, set: setRank, placeholder: '예) 9072' },
          { label: '명성', value: fame, set: setFame, placeholder: '예) 164879' },
          { label: '활동', value: activity, set: setActivity, placeholder: '예) 5214293' },
          { label: '전투력', value: power, set: setPower, placeholder: '예) 7710' },
        ].map(({ label, value, set, placeholder }) => (
          <div key={label}>
            <label style={labelStyle}>{label}</label>
            <input
              type="number"
              value={value}
              onChange={e => set(e.target.value)}
              placeholder={placeholder}
              style={inputStyle}
            />
          </div>
        ))}
      </div>

      {gp !== null && (
        <div style={{
          background: 'rgba(124,106,247,0.15)', border: '1px solid #7c6af7',
          borderRadius: 12, padding: '20px 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 13, color: '#7c6af7', marginBottom: 8, fontWeight: 500 }}>
            예상 길드포인트
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, color: '#e8e9f0', letterSpacing: -1 }}>
            {Math.round(gp).toLocaleString()}
          </div>
          <div style={{ fontSize: 12, color: '#8b8fa8', marginTop: 8 }}>
            ※ 실제 값과 최대 ±5 오차 발생 가능
          </div>
        </div>
      )}

      <div style={{ marginTop: 32, background: '#1a1d27', border: '1px solid #2e3248', borderRadius: 10, padding: 16, fontSize: 12, color: '#8b8fa8', lineHeight: 1.8 }}>
        <div style={{ fontWeight: 700, color: '#e8e9f0', marginBottom: 8 }}>추정 공식</div>
        <div>랭크 × 0.351</div>
        <div>+ 명성 × 0.00191</div>
        <div>+ 활동 × 0.0000466</div>
        <div>+ 전투력 × 0.240</div>
        <div>+ 3062</div>
        <div style={{ marginTop: 8, color: '#7c6af7' }}>6개 데이터 기반 회귀분석으로 도출된 추정 공식입니다.</div>
      </div>
    </div>
  );
}
