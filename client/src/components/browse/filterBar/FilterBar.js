import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {ButtonM} from "../../../styles/buttons";

const FilterBar = ({ itemData, dispatch, searchTerm, setSelectedItem, setFilteredItems, charity_state }) => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (itemData) {
      filterItems();
    }
  }, [itemData, searchTerm]);

  const clearFilter = () => {
    setFilteredItems(itemData);
    setSelectedItem(null);
    dispatch({
      type: "SET_SEARCH",
      payload: ''
    });
  };

  const filterItems = () => {

    let innerFilteredItems = itemData.filter(item => {
      return !(['false', 'denied'].includes(charity_state) && item.charity_only)
    });
    if (searchTerm.length > 2) {
      const searchTerms = searchTerm.toLowerCase().split(' ');
      searchTerms.forEach(term => {
        if (term.length > 2) {
          innerFilteredItems = innerFilteredItems.filter(item => {
            if (item.category.toLowerCase().includes(term) ||
                item.description.toLowerCase().includes(term) ||
                item.title.toLowerCase().includes(term) ||
                item.tag.includes(term)) {
                  return true;
                }
          });
        }
      });
    }
    if (document.getElementById("distance").value !== "--Select Distance--") {
      innerFilteredItems = innerFilteredItems.filter((item) => {
        return item.distance <= document.getElementById("distance").value;
      });
    }
    if (document.getElementById("category").value !== "--Select Category--") {
      innerFilteredItems = innerFilteredItems.filter((item) => {
        return item.category === document.getElementById("category").value;
      });
    }
    if (document.getElementById("tag").value !== "--Select Tag--") {
      innerFilteredItems = innerFilteredItems.filter((item) => {
        return item.tag.includes(document.getElementById("tag").value);
      });
    }
    setFilteredItems(innerFilteredItems);

    const newCategories = innerFilteredItems.reduce(
      (unique, item) =>
        unique.includes(item.category) ? unique : [...unique, item.category],
      []
    );
    setCategories(newCategories);

    const newTags = [];
      innerFilteredItems.forEach((item) => {
        item.tag.forEach((tag) => {
          if (!newTags.includes(tag)) {
            newTags.push(tag);
          }
        });
      });
      setTags(newTags);
  };

  return (
    <FilterBarForm>
      <StyledSelect id="distance" onChange={filterItems}>
        <option>--Select Distance--</option>
        <option value={5}>5 miles</option>
        <option value={10}>10 miles</option>
        <option value={25}>25 miles</option>
        <option value={50}>50 miles</option>
        <option value={100}>100 miles</option>
      </StyledSelect>
      <StyledSelect id="category" onChange={filterItems}>
        <option>--Select Category--</option>
        {categories.map((category, idx) => (
          <option key={idx}>{category}</option>
        ))}
      </StyledSelect>
      <StyledSelect id="tag" onChange={filterItems}>
        <option>--Select Tag--</option>
        {tags.map((tag, idx) => (
          <option key={idx}>{tag}</option>
        ))}
      </StyledSelect>
      <StyledButton type="reset" onClick={clearFilter}>
        Clear
      </StyledButton>
    </FilterBarForm>
  );
};

export default FilterBar;

const FilterBarForm = styled.form`
  display: flex;
  align-items:center;
  margin: 10px;
`;

const StyledSelect = styled.select`
  display: flex;
  margin: 10px;
  font-size:1.5em;
  background:white;
  padding: 0.4em 0.5em;
  border-radius:60px;
  color: var(--color2);
  filter: drop-shadow(0 10px 10px rgba(0,0,0,0.5));
  option {
    background:white;
  }
`;

const StyledButton = styled(ButtonM)`
  font-size:1.5em;
  padding: 0.4em 0.5em;
`;