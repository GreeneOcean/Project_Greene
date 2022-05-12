import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FilterBar = ({ itemData, setSelectedItem, setFilteredItems }) => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (itemData) {
      const newCategories = itemData.reduce(
        (unique, item) =>
          unique.includes(item.category) ? unique : [...unique, item.category],
        []
      );
      setCategories(newCategories);

      const newTags = [];
      itemData.forEach((item) => {
        item.tag.forEach((tag) => {
          if (!newTags.includes(tag)) {
            newTags.push(tag);
          }
        });
      });
      setTags(newTags);
      filterItems();
    }
  }, [itemData]);

  const filterItems = () => {
    let filteredItems = itemData;
    if (document.getElementById("distance").value !== "--Select Distance--") {
      filteredItems = filteredItems.filter((item) => {
        return item.distance <= document.getElementById("distance").value;
      });
    }
    if (document.getElementById("category").value !== "--Select Category--") {
      filteredItems = filteredItems.filter((item) => {
        return item.category === document.getElementById("category").value;
      });
    }
    if (document.getElementById("tag").value !== "--Select Tag--") {
      filteredItems = filteredItems.filter((item) => {
        return item.tag.includes(document.getElementById("tag").value);
      });
    }
    setFilteredItems(filteredItems);
  };

  const clearFilter = () => {
    setFilteredItems(itemData);
    setSelectedItem(null);
  };

  return (
    <FilterBarForm>
      <select id="distance" onChange={filterItems}>
        <option>--Select Distance--</option>
        <option value={5}>5 miles</option>
        <option value={10}>10 miles</option>
        <option value={25}>25 miles</option>
        <option value={50}>50 miles</option>
        <option value={100}>100 miles</option>
      </select>
      <select id="category" onChange={filterItems}>
        <option>--Select Category--</option>
        {categories.map((category, idx) => (
          <option key={idx}>{category}</option>
        ))}
      </select>
      <select id="tag" onChange={filterItems}>
        <option>--Select Tag--</option>
        {tags.map((tag, idx) => (
          <option key={idx}>{tag}</option>
        ))}
      </select>
      <button type="reset" onClick={clearFilter}>
        Clear
      </button>
    </FilterBarForm>
  );
};

export default FilterBar;

const FilterBarForm = styled.form`
  display: flex;
  margin: 10px;
`;
