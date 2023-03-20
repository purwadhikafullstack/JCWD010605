import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config/config.js';
import { useParams } from 'react-router-dom';

function PropertyDetails(props) {
  const [property, setProperty] = useState(null);

  const { id } = useParams();
  const fetchProDetail = async () => {
    await axiosInstance.get(`/propertys/detail/${id}`).then((res) => {
      // console.log(res.data.result);
      const datas = res.data.result;
      setProperty(datas);
      console.log(datas);
    });
  };

  useEffect(() => {
    fetchProDetail();
    console.log(property);
  }, [id]);

  return (
    <div>
      {property ? (
        <div>
          <h1>{property.category?.id}</h1>
          <h1>{property.category?.provinsi}</h1>
          <h1>{property.category?.kabupaten}</h1>
          <h1>{property.category?.kecamatan}</h1>
          <h1>{property.name}</h1>
          <p>{property.description}</p>
          <p>Price: {property.propertyImage}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PropertyDetails;
