import React from "react";

export default function PosCity({ title, city = [], onSelectCity }) {
  return (
    city.length > 0 && (
      <div className="pos-card">
        <h4>{title}</h4>
        <ul className="pos-list">
          {city.map((c, idx) => {
            if (typeof c === "string") {
              c = { id: idx, city: c };
            }
            return (
              <li
                key={c.id}
                className="city-item"
                onClick={() => onSelectCity(c.city)}
              >
                <span className="city-local-text">{c.city}</span>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
}
