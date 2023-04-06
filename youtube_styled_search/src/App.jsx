import { useCallback, useEffect, useState } from "react";
import './App.css'

import SearchCard from "./components/SearchCard";
import SearchInput from "./components/SearchInput";

function App() {
  const [data, setData] = useState([])
  const [showDropdown, setShowDropdown] = useState(false);
  const [items, setItems] = useState(data)
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [mouseHovered, setMouseHovered] = useState(null);

  useEffect(() => {

    fetch('http://www.mocky.io/v2/5ba8efb23100007200c2750c')
      .then(response => response.json())
      .then(data => setData(data));

  }, [])


  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'ArrowUp' && active > 0) {
        setActive(active => active - 1);
        setMouseHovered(null);
      }
      if (e.key === 'ArrowDown' && active < items.length - 1) {
        setActive(active => active + 1);
        setMouseHovered(null);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, items.length]);

  const handleMouseEnter = id => {
    setMouseHovered(id);
  };

  useEffect(() => {
    if (mouseHovered !== null) {
      setActive(mouseHovered);
    }
  }, [mouseHovered]);

  const handleOnFocus = () => {
    setShowDropdown(true);
  };

  const handleOnBlur = () => {
    setShowDropdown(false);
    setActive(0)
  };

  const handleOnChange = (e) => {
    setActive(0)
    setQuery(e.target.value);
  }

  const highlightQuery = (value) => `<span class="highlight-text">${value}</span>`;

  useEffect(() => {
    const filteredData = data.filter(({ id, name, address, items, pincode }) => {

      if (id.toLowerCase().includes(query.toLowerCase())) return true;
      if (name.toLowerCase().includes(query.toLowerCase())) return true;
      if (address.toLowerCase().includes(query.toLowerCase())) return true;
      if (pincode.toLowerCase().includes(query.toLowerCase())) return true;
      if (items.find((item) => item.toLowerCase().includes(query.toLowerCase()))) return true;
      return false;
    });

    const formattedData = filteredData.map((userObj) => {
      let { id, name, address, pincode } = userObj;

      console.log(name, 'name')

      if (id.includes(query))
        id = id.replace(query, highlightQuery(query));
      if (name.toLowerCase().includes(query.toLowerCase()))
        name = name.replace(query, highlightQuery(query));
      if (address.includes(query))
        address = address.replace(query, highlightQuery(query));

      return { ...userObj, id, name, address, originalID: id };
    });

    setItems(formattedData);
  }, [query]);

  return (
    <div className="">
      <SearchInput
        {...{
          handleOnChange,
          handleOnFocus,
          handleOnBlur
        }}
      />
      {showDropdown && query && <SearchCard {...{ items, active, query, handleMouseEnter }} />}
    </div>
  );
}

export default App;
