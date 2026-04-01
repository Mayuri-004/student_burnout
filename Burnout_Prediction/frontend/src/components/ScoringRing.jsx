const ScoreRing = ({ score = 7.4, max = 10, color = "#ef4444" }) => {
  const r = 40, cx = 50, cy = 50, circ = 2 * Math.PI * r;
  const offset = circ - (score / max) * circ;
  return (
    <div className="score-ring">
      <svg viewBox="0 0 100 100" width="100" height="100">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="score-ring-label">
        <span className="score-val">{score}</span>
        <span className="score-denom">/ {max}</span>
      </div>
    </div>
  );
};
export default ScoreRing;