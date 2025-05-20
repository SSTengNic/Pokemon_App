import React, { useState } from 'react';

const rarityOrder = [
  "Common",
  "Uncommon",
  "Rare",
  "Double Rare",
  "Ultra Rare",
  "Rare Holo",
  "Rare Holo EX",
  "Rare Holo GX",
  "Rare Holo VMAX",
  "Rare Holo V",
  "Rare Shiny GX",
  "Rare Rainbow",
  "Rare Prime",
  "Rare Ultra",
  "Promo",
  "Classic Collection",
  "Illustration Rare",
  "Special Illustration Rare",
  "Special Art",
  "Immersive Rare",
  "Shiny Rare", "Double Shiny Rare",
  "Crown Rare",
  "Rare Ultra",
  "Rare Secret"
];

function App() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

const handleSubmit = async () => {
  try {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${search}`);
    const data = await response.json();
    setCards(data.data); // Don't sort yet — just store raw data
  } catch (err) {
    console.error("Error fetching cards:", err);
  }
};

const sortedCards = [...cards].sort((a, b) => {
  // Get rarity index
  const rarityA = rarityOrder.indexOf(a.rarity || "");
  const rarityB = rarityOrder.indexOf(b.rarity || "");

  const safeRarityA = rarityA === -1 ? 0 : rarityA;
  const safeRarityB = rarityB === -1 ? 0 : rarityB;

  // Get price (we use holofoil market price)
  const priceA = a.tcgplayer?.prices?.holofoil?.market ?? 0;
  const priceB = b.tcgplayer?.prices?.holofoil?.market ?? 0;

  // Decide sorting method
  switch (sortBy) {
    case "rarity-asc":
      return safeRarityA - safeRarityB;
    case "rarity-desc":
      return safeRarityB - safeRarityA;
    case "price-asc":
      return priceA - priceB;
    case "price-desc":
      return priceB - priceA;
    default:
      return 0;
  }
});


  return (
    <div style={{ padding: '20px' }}>
      <h1>Pokémon Card Search</h1>

      <input
        type="text"
        placeholder="Enter Pokémon name (e.g., pikachu)"
        value={search}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Search</button>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort by</option>
        <option value="rarity-asc">Rarity (Low → High)</option>
        <option value="rarity-desc">Rarity (High → Low)</option>
        <option value="price-asc">Price (Low → High)</option>
        <option value="price-desc">Price (High → Low)</option>
      </select>


<div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
  {sortedCards.length > 0 ? (
    sortedCards.map((card) => (
      <div key={card.id} style={{ margin: '10px', textAlign: 'center' }}>
        <img
          src={card.images.small}
          alt={card.name}
          style={{ width: '200px', height: 'auto' }}
        />
        <h3>{card.name}</h3>
        <p><b>Set:</b> {card.set.name}</p>
        <p><b>Rarity:</b> {card.rarity || "N/A"}</p>
        <p><b>id:</b> {card.id}</p>
        <p>
          <b>Price:</b> $
          {card.tcgplayer?.prices?.holofoil?.market?.toFixed(2) || "N/A"}
        </p>
      </div>
    ))
  ) : (
    <p>No results yet. Try searching for a Pokémon.</p>
  )}
</div>

    </div>
  );
}

export default App;
