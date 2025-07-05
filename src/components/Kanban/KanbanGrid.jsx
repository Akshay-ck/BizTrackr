import React from "react";

/**
 * Generic grid—think “Kanban without columns”.
 * @param {Array}   items        Array of data objects
 * @param {func}    renderCard   (item) => JSX for the card
 * @param {string}  emptyText    Optional empty‑state text
 */
function KanbanGrid({ items = [], renderCard, emptyText = "Nothing here yet" }) {
  if (!items.length) {
    return (
      <div className="kanban-empty">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="kanban-grid">
      {items.map((itm) => (
        <div key={itm.id} className="kanban-cell">
          {renderCard(itm)}
        </div>
      ))}
    </div>
  );
}

export default KanbanGrid;
