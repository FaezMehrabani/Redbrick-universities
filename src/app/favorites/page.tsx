"use client"; // This is a client component

import Table from "@/components/table";
import React, { useEffect, useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch("/api/favorites");
      const data = await res.json();
      if (res.ok) setFavorites(data);
    };

    fetchFavorites();
  }, []);

  const onToggleFavorite = async (id: number) => {
    try {
      const res = await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ universityId: id }),
      });

      const data = await res.json();
      if (res.ok) {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.university_id !== id)
        );
      } else {
        alert(data.error || "Failed to update favorites");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <>
      <div className="container">
        <Table
          data={favorites}
          onToggleFavorite={onToggleFavorite}
          isFavorits={true}
        />
      </div>
    </>
  );
};

export default Favorites;
