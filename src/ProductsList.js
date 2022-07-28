import { useEffect, useState } from 'react';
import * as React from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState('ASC');
  const [searchInput, setSearchInput] = useState('');
  const [filterdResults, setFilterdResults] = useState([]);

  const fetchData = async () => {
    await fetch('https://fakestoreapi.com/products')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      });
  };

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...products].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setProducts(sorted);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const sorted = [...products].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setProducts(sorted);
      setOrder('ASC');
    }
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filterdData = products.filter((fitem) => {
        return Object.values(fitem)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilterdResults(filterdData);
    } else {
      setFilterdResults(products);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="header">
        <label> Filter Table Data : </label>
        <input
          type="text"
          name="search"
          placeholder="Search"
          onChange={(e) => searchItems(e.target.value)}
        />
      </div>
      {searchInput.length > 1 ? (
        <table>
          <tr>
            <th onClick={() => sorting('title')}> Product list</th>
            <th> Rates</th>
          </tr>
          {filterdResults.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.price}</td>
            </tr>
          ))}
          <tr>
            <td style={{ borderTop: '2px solid black' }}>Total</td>
            <td style={{ borderTop: '2px solid black' }}>
              {filterdResults
                .map((itm) => itm.price)
                .reduce((cur, int) => cur + int, 0)
                .toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </td>
          </tr>
        </table>
      ) : (
        <table>
          <tr>
            <th onClick={() => sorting('title')}> Product list</th>
            <th> Rates</th>
          </tr>
          {products.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.price}</td>
            </tr>
          ))}
          <tr>
            <td style={{ borderTop: '2px solid black' }}>Total</td>
            <td style={{ borderTop: '2px solid black' }}>
              {products
                .map((itm) => itm.price)
                .reduce((cur, int) => cur + int, 0)
                .toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </td>
          </tr>
        </table>
      )}
    </div>
  );
};

export default Products;
