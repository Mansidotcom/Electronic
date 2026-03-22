import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";



const FilterSidebar = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange = [0, 9999999],
  setPriceRange,
  allProducts = [],
  onClose,
}) => {

  console.log("PRICE RANGE:", priceRange);

  /* categories */
  const categories = allProducts.map((p) => p.category);
  const uniqueCategory = ["All", ...new Set(categories)];

  /*  brands */
  const brands = allProducts.map((p) => p.brand);
  const uniqueBrand = ["All", ...new Set(brands)];

  /* handlers */
  const handleCategoryClick = (val) => {
    setCategory(val);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

 
const handleMinChange = (e) => {
  console.log("MIN SLIDER CHANGED:", e.target.value);
  setPriceRange([Number(e.target.value), priceRange[1]]);
};

const handleMaxChange = (e) => {
  console.log("MAX SLIDER CHANGED:", e.target.value);
  setPriceRange([priceRange[0], Number(e.target.value)]);
};



  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 9999999]);
  };

  return (
    <div className="bg-gray-200 mt-10 pr-4 p-4 rounded-md h-max md:block w-60 -ml-10 relative">
      {onClose && (
        <button onClick={onClose} className="absolute top-2 right-2 md:hidden">
          <X size={20} />
        </button>
      )}
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />

      {/* Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {uniqueCategory.map((item, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={category === item}
              onChange={() => handleCategoryClick(item)}
            />
            {item}
          </label>
        ))}
      </div>

      {/* Brand */}
      <h1 className="mt-5 font-semibold text-xl">Brand</h1>
      <div className="flex flex-col gap-2 mt-3">
        <select
          className="bg-white w-full p-2 border-gray-300 border-2 rounded-md"
          value={brand}
          onChange={handleBrandChange}
        >
          {uniqueBrand.map((item, index) => (
            <option key={index} value={item}>
              {item.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Price Range */}
        <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>

        <label className="text-sm">
          ₹ {priceRange[0]} - ₹ {priceRange[1]}
        </label>

        <div className="flex gap-2 items-center">
          <input
            type="number"
            min="0"
            value={priceRange[0]}
            onChange={handleMinChange}
            className="w-24 p-1 border border-gray-300 rounded"
          />
          <span>-</span>
          <input
            type="number"
            min="0"
            value={priceRange[1]}
            onChange={handleMaxChange}
            className="w-24 p-1 border border-gray-300 rounded"
          />
</div>
      
   <input
  type="range"
  min={0}
  max={priceRange[1]}
  step={100}
  value={priceRange[0]}
  onChange={handleMinChange}
  className="w-full"
/>

<input
  type="range"
  min={priceRange[0]}
  max={9999999}
  step={100}
  value={priceRange[1]}
  onChange={handleMaxChange}
  className="w-full"
/>



        {/*  Reset */}
        <Button
          onClick={resetFilters}
          className="bg-pink-500 cursor-pointer w-full mt-4"
        >
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
