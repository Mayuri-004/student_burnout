const SliderRow = ({ label, value, onChange, unit }) => (
  <div className="slider-row">
    <span className="slider-label">{label}</span>
    <input className="slider-input" type="range" min={0} max={10} step={0.5} value={value}
      onChange={e => onChange(parseFloat(e.target.value))} />
    <span className="slider-val">{unit === "hrs" ? `${value} hrs` : `${value} / 10`}</span>
  </div>
);

export default SliderRow;