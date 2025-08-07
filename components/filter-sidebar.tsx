// components/filter-sidebar.tsx
export function FilterSidebar() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Categories</h4>
        <ul className="space-y-1">
          <li><input type="checkbox" /> Electronics</li>
          <li><input type="checkbox" /> Fashion</li>
          <li><input type="checkbox" /> Home</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Price Range</h4>
        <input type="range" />
      </div>
    </div>
  );
}
