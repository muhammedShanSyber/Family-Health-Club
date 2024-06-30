import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
require('dotenv').config();

function Map() {
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {


        // Initialize map
        const leafletMap = L.map('map').setView([51.505, -0.09], 10); // Default center coordinates
        setMap(leafletMap);

        // Add tile layer from OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(leafletMap);

        const fetchNearbyHospitals = async (latitude, longitude) => {
            try {
                const response = await axios.get(`https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="hospital"](around:5000,${latitude},${longitude});out;`);
                const hospitals = response.data.elements;

                hospitals.forEach(hospital => {
                    const { lat, lon } = hospital;
                    L.marker([lat, lon]).addTo(leafletMap).bindPopup(hospital.tags.name || 'Hospital');
                });
            } catch (error) {
                console.error('Error fetching nearby hospitals:', error);
            }
        };

        // Get user's current location using Geolocation API
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ latitude, longitude });
                        leafletMap.setView([latitude, longitude], 13); // Set map view to user's current location
                        fetchNearbyHospitals(latitude, longitude); // Fetch nearby hospitals based on user's location
                    },
                    error => {
                        console.error('Error getting current location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported.');
            }
        };

        getUserLocation();

        return () => {
            // Clean up
            leafletMap.remove();
        };
    }, []);
    return (
        <>
        <b style={{fontSize:"30px", marginLeft:"130px",marginBottom:'0'}}> Hospitals Near me</b>
           
            <div id="map" />
        </>
    );
}

export default Map;  