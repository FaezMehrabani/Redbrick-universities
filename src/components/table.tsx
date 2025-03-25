import React, { FC } from "react";
import classes from "./table.module.scss";

interface TableProps {
  data: Array<{
    id: number;
    name: string;
    state: string;
    website: string;
    university_id: number;
  }>;
  onToggleFavorite: (id: number) => void;
  favorites?: Set<any>;
  isFavorits?: boolean;
}

const Table: FC<TableProps> = ({
  data,
  onToggleFavorite,
  favorites,
  isFavorits = false,
}) => {
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>State/Province</th>
          <th>Website</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.state}</td>
            <td>
              <a href={item.website} target="_blank" rel="noopener noreferrer">
                {item.website}
              </a>
            </td>
            <td>
              {isFavorits ? (
                <button
                  onClick={() => onToggleFavorite(item.university_id)}
                  className={classes.isFavorite}
                >
                  Remove from Favorites
                </button>
              ) : (
                <button
                  onClick={() => onToggleFavorite(item.id)}
                  className={
                    favorites?.has(item.id) ? classes.isFavorite : undefined
                  }
                >
                  {favorites?.has(item.id)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
