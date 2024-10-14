import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]); // Data asli
  const [filteredData, setFilteredData] = useState([]); // Data setelah difilter

  // Fetch data dari file JSON di public/data.json
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Fungsi filter: Harga lebih besar dari nilai minimum
  const filterByPrice = (minPrice) => {
    const result = data.filter((item) => item.price > minPrice);
    setFilteredData(result);
  };

  // Fungsi filter: Berdasarkan tipe kamera (Mirrorless/DSLR)
  const filterByType = (type) => {
    const result = data.filter((item) => item.type === type);
    setFilteredData(result);
  };

  return (
    <div>
      <h1>Camera Catalog</h1>

      {/* Tombol Filter */}
      <button onClick={() => filterByPrice(30000000)}>
        Filter Price {">"} 30,000,000
      </button>
      <button onClick={() => filterByType("Mirrorless")}>
        Filter by Type: Mirrorless
      </button>

      {/* Menampilkan Data */}
      <ul>
        {(filteredData.length ? filteredData : data).map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.type} | Price: Rp
            {item.price.toLocaleString()} | Discount: {item.discount}%
          </li>
        ))}
      </ul>
    </div>
  );
}
