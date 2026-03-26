import { useState } from 'react';

const PENALTY_RULES = [
  {
    title: '① 욕설 및 언어폭력',
    items: [
      '욕설·인신공격·가족비방·음란 발언·개인정보 유포 등: 1~3점',
      '부적절한 방 제목: 3점',
      '외부 메신저 홍보: 1주일 정지 or 영구 추방',
      '음란 행위: 1차 2개월 정지/추방, 2차 영구 추방',
    ],
  },
  {
    title: '② 비매너 행위',
    items: [
      '도배·시간 끌기·고의 패배·더티 플레이: 1~3점',
      '일반/이벤트 어뷰징: 3~5점',
      '부계정 관전: 10점',
      '랭크 게임 협박·거는 행위·익명성 훼손: 3~5점',
      '랭크 게임 어뷰징 (친플 등): 영구 추방',
    ],
  },
  {
    title: '③ 비정상 계정 이용',
    items: [
      '계정 공유/도용/거래: 영구 추방',
      '아이템 현금화: 1차 1주일 정지/추방, 2차 추방',
      '다중 계정 악용: 영구 추방',
    ],
  },
  {
    title: '④ 공식 홈페이지 불량 이용',
    items: [
      '중복 신고: 3점',
      '신고 조작: 1주일 정지 및 신고 이용 불가',
      '욕설/폭언: 홈페이지 차단',
    ],
  },
  {
    title: '⑤ 버그 및 시스템 악용',
    items: [
      '시스템 어뷰징·불법 프로그램·결제 악용: 영구 추방',
    ],
  },
  {
    title: '⑥ 게임 운영 방해',
    items: [
      '추방자 플레이 지원·명예 훼손·신상 정보 악용: 영구 추방',
    ],
  },
];

export default function Penalty() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 16px 40px' }}>
      <h2 style={{ marginBottom: 4 }}>벌점 관련</h2>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 28 }}>
        마피아42 공식 운영 정책 기준
      </p>

      {/* 변경 후 섹션 */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#aaa', letterSpacing: 0.5 }}>
          &lt;변경 후&gt; 벌점 시스템
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              label: '① 벌점',
              content: [
                '최근 1년간의 벌점으로만 계산하여 정지 일수 산정',
                '부과 당일 제외하고 적용',
                '진행 중 징계 기간에 추가 벌점은 영향 없음',
                '1~5점: 1일 정지',
                '6점 이상: (누적점수 - 5) × 2일 정지 (예: 8점 → 6일, 15점 → 20일)',
              ],
            },
            {
              label: '② 영구 추방',
              content: ['중대한 행위 시 모든 계정의 게임 이용 제한 및 신규 계정 생성 금지'],
            },
            {
              label: '③ 변경 및 삭제 조치',
              content: ['부적절한 내용이 포함된 명칭 혹은 자기소개는 일방적 조치 가능'],
            },
            {
              label: '④ 기타 조치',
              content: ['악영향 행위 적발 시 추가 조치 진행 가능'],
            },
            {
              label: '⑤ 조치 기준',
              content: [
                '약관 및 법령 위반 시 조치 가능',
                '경고 조치 없이 바로 제재될 수 있음',
                '위반 정도에 따라 감경 또는 가중 가능',
              ],
            },
          ].map(({ label, content }) => (
            <div
              key={label}
              style={{
                background: '#1a1d27',
                border: '1px solid #2e3248',
                borderRadius: 10,
                padding: '14px 16px',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#e8e9f0' }}>{label}</div>
              <ul style={{ paddingLeft: 16, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {content.map((c, i) => (
                  <li key={i} style={{ fontSize: 13, color: '#8b8fa8', lineHeight: 1.6 }}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 종합 제재 규정 */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#aaa', letterSpacing: 0.5 }}>
          종합 제재 규정
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PENALTY_RULES.map((rule, i) => (
            <div
              key={i}
              style={{
                background: '#1a1d27',
                border: `1px solid ${openIndex === i ? '#7c6af7' : '#2e3248'}`,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: openIndex === i ? '#7c6af7' : '#e8e9f0',
                  fontWeight: 700,
                  fontSize: 14,
                  textAlign: 'left',
                }}
              >
                {rule.title}
                <span style={{ fontSize: 12, color: '#8b8fa8' }}>{openIndex === i ? '▲' : '▼'}</span>
              </button>

              {openIndex === i && (
                <ul style={{ margin: 0, padding: '0 16px 14px 32px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {rule.items.map((item, j) => (
                    <li key={j} style={{ fontSize: 13, color: '#8b8fa8', lineHeight: 1.6 }}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 신고접수방법 바로가기 */}
      <a
        href="http://mafia42.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '14px',
          background: 'rgba(124, 106, 247, 0.15)',
          border: '1px solid #7c6af7',
          borderRadius: 10,
          color: '#7c6af7',
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        신고접수방법 바로가기 →
      </a>
    </div>
  );
}
