import React, { FC } from "react";
import classes from "./table.module.scss";

interface TableProps {
  data: Array<{
    id: number;
    name: string;
    state_province: string;
    web_pages: string;
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
    <div className={classes["table-container"]}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>University Name</th>
            <th>State/Province</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.state_province}</td>
              <td>
                {Array.isArray(item.web_pages) // Ensure it's an array
                  ? item.web_pages.map((url, index) => (
                      <span key={index}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url}
                        </a>
                        {index < item.web_pages.length - 1 ? ", " : ""}{" "}
                        {/* Add a comma separator */}
                      </span>
                    ))
                  : ""}
                {/* <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.website}
                </a> */}
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
    </div>
  );
};

export default Table;
