const SearchInput = ({
  handleOnChange,
  handleOnFocus,
  handleOnBlur
}) => {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search by ID, address, name, address, pincode"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
      <img src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png" alt="" className="search-icon" />
    </div>
  )
}

export default SearchInput;