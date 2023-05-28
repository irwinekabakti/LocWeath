import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useSelector, useDispatch } from "react-redux";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {
  setLocation,
  setSaves,
  setItemSaved,
} from "../store/action/weather-slice";
import { Button } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const token =
  (mapboxgl.accessToken = `pk.eyJ1IjoiZGF2aWRodWdoZXNqciIsImEiOiJjbGFnYjk0ZTIwZGh0M3Vxd3I2aGFodG13In0.GSLD5MNRwE8n3Da_bqQS-A`);

const Mapbox = ({ location, current }) => {
  const lat = location?.lat;
  const lng = location?.lon;

  const fahrenheit = useSelector((state) => state.weatherState.fahrenheit);
  const dispatch = useDispatch();

  const savedItems = JSON.parse(localStorage.getItem("savedItems"));
  const saves = useSelector((state) => state.weatherState.saves);
  const savedToLocal = useSelector((state) => state.weatherState.itemSaved);

  useEffect(() => {
    dispatch(setSaves(savedItems));
  }, []);

  const addSaves = (item) => {
    let itemList = [...saves];
    let addArray = true;
    for (let i = 0; i < saves.length; i++) {
      if (saves[i].name === item.name) {
        itemList.splice(i, 1);
        addArray = false;
      }
    }
    if (addArray) {
      itemList.push(item);
    }
    dispatch(setSaves([...itemList]));
  };

  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(saves));
    if (savedItems) {
      for (let i = 0; i < savedItems.length; i++) {
        if (savedItems[i].name === location.name) {
          dispatch(setItemSaved(true));
          break;
        } else if (savedItems[i].id !== location.name) {
          dispatch(setItemSaved(false));
        }
      }
    }
  }, [savedItems]);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng2, setLng] = useState(lng);
  const [lat2, setLat] = useState(lat);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng2, lat2],
      zoom: zoom,
    });
    const marker = new mapboxgl.Marker()
      .setLngLat([lng2, lat2])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>You are here </h3>`)
      )
      .addTo(map.current);

    const geocoder = new MapboxGeocoder({
      accessToken: token,
      mapboxgl: mapboxgl,
      marker: false,
    });

    map.current.addControl(geocoder);

    geocoder.on("result", (e) => {
      dispatch(setLocation(e.result.text));
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <>
      <div ref={mapContainer} className="map-container" />

      <Button
        onClick={() => {
          addSaves(location);
          dispatch(setItemSaved(!savedToLocal));
        }}
        sx={
          savedToLocal
            ? { margin: "0 !important", backgroundColor: "green" }
            : { margin: "0 !important", backgroundColor: "" }
        }
        variant={"contained"}>
        {" "}
        {savedToLocal ? "Location Saved" : "Save location"}{" "}
      </Button>
    </>
  );
};

export default Mapbox;
