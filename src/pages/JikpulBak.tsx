import { useState } from 'react';

interface Job {
  name: string;
  team: '시민팀' | '마피아팀' | '교주팀';
}

const JOBS: Job[] = [
  // 시민팀
  { name: '경찰', team: '시민팀' },
  { name: '자경단원', team: '시민팀' },
  { name: '요원', team: '시민팀' },
  { name: '의사', team: '시민팀' },
  { name: '간호사', team: '시민팀' },
  { name: '군인', team: '시민팀' },
  { name: '정치인', team: '시민팀' },
  { name: '영매', team: '시민팀' },
  { name: '기자', team: '시민팀' },
  { name: '건달', team: '시민팀' },
  { name: '판사', team: '시민팀' },
  { name: '해커', team: '시민팀' },
  { name: '심리학자', team: '시민팀' },
  { name: '마술사', team: '시민팀' },
  { name: '사립탐정', team: '시민팀' },
  { name: '연인', team: '시민팀' },
  { name: '성직자', team: '시민팀' },
  { name: '공무원', team: '시민팀' },
  { name: '파파라치', team: '시민팀' },
  { name: '도굴꾼', team: '시민팀' },
  // 마피아팀
  { name: '마피아', team: '마피아팀' },
  { name: '스파이', team: '마피아팀' },
  { name: '짐승인간', team: '마피아팀' },
  { name: '마녀', team: '마피아팀' },
  { name: '마담', team: '마피아팀' },
  { name: '도둑', team: '마피아팀' },
  { name: '과학자', team: '마피아팀' },
  { name: '사기꾼', team: '마피아팀' },
  { name: '청부업자', team: '마피아팀' },
  { name: '대부', team: '마피아팀' },
  { name: '악인', team: '마피아팀' },
  // 교주팀
  { name: '교주', team: '교주팀' },
  { name: '광신도', team: '교주팀' },
];

const TEAM_COLOR: Record<string, string> = {
  시민팀: '#1677ff',
  마피아팀: '#ff4d4f',
  교주팀: '#722ed1',
};

function hasBatchim(char: string): boolean {
  const code = char.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return false;
  return (code - 0xAC00) % 28 > 0;
}

function calcJobValue(name: string): { chars: number; batchim: number } {
  const chars = name.length;
  const batchim = name.split('').filter(hasBatchim).length;
  return { chars, batchim };
}

export default function JikpulBak() {
  const [target, setTarget] = useState('');
  const [gender, setGender] = useState<'남' | '여'>('남');
  const [maleWeight, setMaleWeight] = useState('');
  const [femaleWeight, setFemaleWeight] = useState('');

  const targetNum = parseInt(target);
  const maleW = parseInt(maleWeight) || 0;
  const femaleW = parseInt(femaleWeight) || 0;
  const weight = gender === '남' ? maleW : femaleW;

  const isValid = !isNaN(targetNum) && target !== '' && maleWeight !== '' && femaleWeight !== '';

  const candidates = isValid
    ? JOBS.filter(job => {
        const { chars, batchim } = calcJobValue(job.name);
        return chars + batchim + weight === targetNum;
      })
    : [];

  const grouped = {
    시민팀: candidates.filter(j => j.team === '시민팀'),
    마피아팀: candidates.filter(j => j.team === '마피아팀'),
    교주팀: candidates.filter(j => j.team === '교주팀'),
  };

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 16px 40px' }}>
      <h2 style={{ marginBottom: 4 }}>직플받 계산기</h2>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 24 }}>
        직업 글자수 + 받침 수 + 성별 가중치 = 직플받 값
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {/* 직플받 값 입력 */}
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
            내 직플받 값
          </label>
          <input
            type="number"
            value={target}
            onChange={e => setTarget(e.target.value)}
            placeholder="게임에서 확인한 숫자 입력"
            style={{
              width: '100%', padding: '10px 12px', borderRadius: 8,
              border: '1px solid #d9d9d9', fontSize: 16, boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 성별 선택 */}
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>성별</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['남', '여'] as const).map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 8, border: '1px solid',
                  borderColor: gender === g ? '#1677ff' : '#d9d9d9',
                  background: gender === g ? '#e6f4ff' : '#fff',
                  color: gender === g ? '#1677ff' : '#333',
                  fontWeight: gender === g ? 700 : 400,
                  fontSize: 16, cursor: 'pointer',
                }}
              >
                {g}자
              </button>
            ))}
          </div>
        </div>

        {/* 가중치 입력 */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
              남자 가중치
            </label>
            <input
              type="number"
              value={maleWeight}
              onChange={e => setMaleWeight(e.target.value)}
              placeholder="숫자 입력"
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 8,
                border: '1px solid #d9d9d9', fontSize: 16, boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
              여자 가중치
            </label>
            <input
              type="number"
              value={femaleWeight}
              onChange={e => setFemaleWeight(e.target.value)}
              placeholder="숫자 입력"
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 8,
                border: '1px solid #d9d9d9', fontSize: 16, boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      </div>

      {/* 결과 */}
      {isValid && (
        <div>
          {candidates.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '32px 0', color: '#888',
              border: '1px solid #f0f0f0', borderRadius: 12,
            }}>
              일치하는 직업이 없습니다.
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: 600, marginBottom: 12 }}>
                후보 직업 {candidates.length}개
              </p>
              {(['시민팀', '마피아팀', '교주팀'] as const).map(team => {
                const jobs = grouped[team];
                if (jobs.length === 0) return null;
                return (
                  <div key={team} style={{ marginBottom: 16 }}>
                    <div style={{
                      fontSize: 12, fontWeight: 700, color: TEAM_COLOR[team],
                      marginBottom: 8, letterSpacing: 1,
                    }}>
                      {team}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {jobs.map(job => {
                        const { chars, batchim } = calcJobValue(job.name);
                        return (
                          <div
                            key={job.name}
                            style={{
                              padding: '10px 16px', borderRadius: 10,
                              border: `2px solid ${TEAM_COLOR[team]}`,
                              background: `${TEAM_COLOR[team]}11`,
                            }}
                          >
                            <div style={{ fontWeight: 700, fontSize: 16 }}>{job.name}</div>
                            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
                              {chars}글자 + 받침{batchim} + {weight} = {chars + batchim + weight}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 전체 직업 참고표 */}
      <details style={{ marginTop: 32 }}>
        <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#555', marginBottom: 12 }}>
          전체 직업 참고표
        </summary>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #f0f0f0', color: '#000' }}>직업</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', color: '#000' }}>팀</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', color: '#000' }}>글자수</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', color: '#000' }}>받침수</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', color: '#000' }}>소계</th>
            </tr>
          </thead>
          <tbody>
            {JOBS.map(job => {
              const { chars, batchim } = calcJobValue(job.name);
              const isCandidate = isValid && chars + batchim + weight === targetNum;
              return (
                <tr
                  key={job.name}
                  style={{
                    background: isCandidate ? `${TEAM_COLOR[job.team]}11` : 'transparent',
                    fontWeight: isCandidate ? 700 : 400,
                  }}
                >
                  <td style={{ padding: '7px 12px', borderBottom: '1px solid #f5f5f5' }}>
                    {job.name}
                  </td>
                  <td style={{ padding: '7px 12px', borderBottom: '1px solid #f5f5f5', textAlign: 'center', color: TEAM_COLOR[job.team], fontSize: 11 }}>
                    {job.team}
                  </td>
                  <td style={{ padding: '7px 12px', borderBottom: '1px solid #f5f5f5', textAlign: 'center' }}>{chars}</td>
                  <td style={{ padding: '7px 12px', borderBottom: '1px solid #f5f5f5', textAlign: 'center' }}>{batchim}</td>
                  <td style={{ padding: '7px 12px', borderBottom: '1px solid #f5f5f5', textAlign: 'center' }}>{chars + batchim}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </details>
    </div>
  );
}
