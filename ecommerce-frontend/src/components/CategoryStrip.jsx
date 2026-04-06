function CategoryStrip({ categories, selected, onSelect }) {
  return (
    <div className="category-container">
      <div className="category-strip">
        {categories.map(c => (
          <div
            key={c}
            className={`category-chip ${selected === c ? "active" : ""}`}
            onClick={() => onSelect(c)}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryStrip;
