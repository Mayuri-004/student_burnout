export default function SliderRow({ label, value, setValue }) {
  return (
    <div className="slider-row">
      <label>{label}</label>

      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <span>{value}</span>
    </div>
  );
}