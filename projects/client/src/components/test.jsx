import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config/config.js';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  const fetchPro = async () => {
    await axiosInstance.get('/propertys').then((res) => {
      // console.log(res.data.result);
      const datas = res.data.result;

      setProperties(datas);
      console.log(datas);
    });
  };

  useEffect(() => {
    fetchPro();
  }, []);

  return (
    <div>
      <h1>Property List</h1>
      <ul>
        {properties.map((property) => (
          <div className="bg-danger">
            <li key={property.id}>
              <a href={`/propertydetaillist/${property.id}`}>{property.name}</a>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;
