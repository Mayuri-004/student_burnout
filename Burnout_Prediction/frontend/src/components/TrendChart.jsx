const TrendChart = () => {
  const pts = [2, 3.5, 5, 4, 5.5, 6.2, 7.4];
  const w = 500, h = 80;
  const toX = i => (i / (pts.length - 1)) * w;
  const toY = v => h - (v / 10) * h;
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mini-chart">
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity=".2" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill="url(#tg)" />
      <path d={d} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((v, i) => <circle key={i} cx={toX(i)} cy={toY(v)} r="4" fill="#2563eb" stroke="#fff" strokeWidth="1.5" />)}
    </svg>
  );
};
export default TrendChart;