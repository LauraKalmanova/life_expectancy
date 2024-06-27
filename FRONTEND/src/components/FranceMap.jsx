import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useMap } from 'react-leaflet/hooks'



const FranceMap = () => {
  const mapRef = useRef();

  const position = [46.603354, 1.888334]; // Center of France

  // GeoJSON data for France regions (simplified example)
  const geoJsonData = {
    // You can fetch this data from an API or a local file
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Île-de-France" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [2.5377, 48.0563],
              [2.3822, 48.8617],
              [3.2683, 49.0576],
              [2.5564, 48.8647],
              [2.5377, 48.0563]
            ]
          ]
        }
      },
      // Add more regions here
    ]
  };

  const style = {
    color: '#ff7800',
    weight: 5,
    opacity: 0.65
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        alert(`Region clicked: ${feature.properties.name}`);
      }
    });
  };

  function MyComponent() {
    const map = useMapEvents({
      click: () => {
        map.locate()
      },
      locationfound: (location) => {
        console.log('location found:', location)
      },
    })
    return null
  }

  return (
    <MapContainer center={position} zoom={6} style={{ height: '100vh', width: '100%' }} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MyComponent />
      <GeoJSON data={geoJsonData} style={style} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default FranceMap;
