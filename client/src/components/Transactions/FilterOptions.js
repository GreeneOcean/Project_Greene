import React from "react";
import { ButtonM } from '../../styles/buttons';


const FilterOptions = ({ filters, setFilter, itemFilter }) => {
  return (
    <div>
      {!!itemFilter ? <ButtonM onClick={() => setFilter(null)}>Clear filter {itemFilter}</ButtonM> : <ButtonM>Filter by</ButtonM>}
      {filters.map(filterOptions => {
        const [ filterName, filterDesciption ] = filterOptions
        return <ButtonM onClick={() => setFilter(filterName)}>{filterDesciption}</ButtonM>
      })}
    </div>
  )
}

export default FilterOptions