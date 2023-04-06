import { useEffect, useRef } from "react";

const SearchCard = ({ items, active, query, handleMouseEnter }) => {

  const itemRef = useRef(null);

  useEffect(() => {
    itemRef?.current?.scrollIntoView({ behavior: 'smooth', inline: "nearest" });
  }, [handleMouseEnter]);

  return (
    <ul className={`cards-list`} >
      {items.map(({ id, name, address, items, pincode }, index) => (
        <li
          ref={index === active ? itemRef : null}
          tabIndex={index === active ? 0 : -1}
          onMouseOver={() => handleMouseEnter(index)}
          key={`card-${index + 1}`}
          className={`${active === index ? "selected" : ''} card-item`}
          style={{
            backgroundColor: index === active ? '#ddd' : 'transparent',
            cursor: 'pointer'
          }}
        >
          <span>
            <strong dangerouslySetInnerHTML={{ __html: id }} />
          </span>

          <p>
            <i dangerouslySetInnerHTML={{ __html: name }} />
          </p>
          {items.find((item) => item.includes(query)) ? (
            <p className="highlight-query">"{query}" found in items</p>
          ) : null}
          <p dangerouslySetInnerHTML={{ __html: address }} />
          <p dangerouslySetInnerHTML={{ __html: pincode }} />
        </li>
      ))}
      {items.length === 0 && <li className="empty-card"> No User Found</li>}
    </ul>
  )
}

export default SearchCard;