import { useState } from 'react';

const BASE = 42;
const STEP = 10;

function calcCost(from: number, to: number): number {
  let total = 0;
  for (let cur = from; cur < to; cur += STEP) {
    total += (cur - 32) * 1000;
  }
  return total;
}

export default function Mailbox() {
  const [current, setCurrent] = useState('');
  const [target, setTarget] = useState('');

  const cur = parseInt(current) || BASE;
  const tgt = parseInt(target) || 0;

  const validCurrent = cur >= BASE && (cur - BASE) % STEP === 0;
  const validTarget = tgt > cur && (tgt - BASE) % STEP === 0;
  const canCalc = validCurrent && validTarget;

  const cost = canCalc ? calcCost(cur, tgt) : null;

  // 다음 한 단계 비용
  const nextCost = validCurrent ? (cur - 32) * 1000 : null;
  const nextSlots = validCurrent ? cur + STEP : null;

  // 확장 단계 목록
  const steps: { from: number; to: number; cost: number }[] = [];
  if (canCalc) {
    for (let c = cur; c < tgt; c += STEP) {
      steps.push({ from: c, to: c + STEP, cost: (c - 32) * 1000 });
    }
  }

  return (
    <div className="page">
      <h1 className="page-title">📬 우체통 확장 계산기</h1>
      <p className="page-desc">
        우체통 칸수를 늘리는 데 필요한 루블을 계산합니다.<br />
        기본 42칸 / 10칸씩 확장 가능
      </p>

      <div className="card">
        <div className="input-group">
          <label className="input-label">현재 우체통 칸수</label>
          <input
            className="input-field"
            type="number"
            placeholder="예: 42"
            value={current}
            onChange={e => setCurrent(e.target.value)}
          />
          {current && !validCurrent && (
            <p className="hint" style={{ color: 'var(--danger)' }}>
              42 이상, 10칸 단위로 입력해주세요 (42, 52, 62...)
            </p>
          )}
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">목표 우체통 칸수</label>
          <input
            className="input-field"
            type="number"
            placeholder="예: 82"
            value={target}
            onChange={e => setTarget(e.target.value)}
          />
          {target && !validTarget && (
            <p className="hint" style={{ color: 'var(--danger)' }}>
              현재 칸수보다 크고 10칸 단위여야 합니다
            </p>
          )}
        </div>
      </div>

      {/* 다음 한 단계 */}
      {validCurrent && (
        <div className="card">
          <p className="section-label">다음 1단계 확장</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              {cur}칸 → {nextSlots}칸
            </span>
            <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--warn)' }}>
              {nextCost!.toLocaleString()} 루블
            </span>
          </div>
        </div>
      )}

      {/* 총 비용 결과 */}
      {canCalc && cost !== null && (
        <>
          <div className="result-box">
            <p className="result-label">총 필요 루블</p>
            <p className="result-value">{cost.toLocaleString()} 루블</p>
            <p className="result-sub">{cur}칸 → {tgt}칸 / {steps.length}단계 확장</p>
          </div>

          {steps.length > 0 && (
            <div className="card" style={{ marginTop: 16 }}>
              <p className="section-label">단계별 비용</p>
              <table className="info-table">
                <thead>
                  <tr>
                    <th>단계</th>
                    <th>확장</th>
                    <th style={{ textAlign: 'right' }}>비용</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.map((s, i) => (
                    <tr key={i}>
                      <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                      <td>{s.from}칸 → {s.to}칸</td>
                      <td style={{ textAlign: 'right', color: 'var(--warn)' }}>
                        {s.cost.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <p className="hint">
        ※ 마이너스 엽서(권엽 등)는 우체통이 가득 차도 강제로 수신됩니다.
      </p>
    </div>
  );
}
