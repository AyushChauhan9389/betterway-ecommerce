import './Filters.css';

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  sortOrder: string;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
}

function Filters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  sortOrder,
  onSortChange,
  onClearFilters
}: Props) {
  const hasActiveFilters = searchTerm || selectedCategory || sortOrder;

  return (
    <div className="filters-container">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Sort by Price</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button onClick={onClearFilters} className="clear-filters-button">
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default Filters;

