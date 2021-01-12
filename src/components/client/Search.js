import React from "react";


export default function Search(props) {

  return (
    <section className="search-form">
      <div className="characters">
        <form className="search">
          <input
            type="text"
            onChange={props.handleInputChange}
            value={props.query}
            name="name"
            tabIndex="0"
            className="prompt search-name"
            placeholder="Search for Classes"
            autoComplete="off"
          />
        </form>

        
      </div>
      <div>
      </div>
    </section>
  );
}