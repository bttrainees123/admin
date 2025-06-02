import { useEffect, useState } from 'react'
import RecatMap from 'google-map-react'
import socketIOClient from 'socket.io-client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon, { data1 } from './utils'

const ENDPOINT = "https://react-map-g1.netlify.app/"

const User = () => {
    const [time, setTime] = useState('');
    const [location, setLocation] = useState(null);
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const newSocket = socketIOClient(ENDPOINT);
        setSocket(newSocket);

        newSocket.on('time', (data) => {
            setTime(data);
        });

        newSocket.on('location', (data) => {
            setLocation(data);
        });

        newSocket.on('notification', (data) => {
            setNotifications((prevNotifications) => [...prevNotifications, data]);
        });
        console.log("Notification ", notifications)

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const locationData = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };
                        console.log("Location Data ", locationData)
                        setLocation(locationData);
                        newSocket.emit('locationUpdate', locationData);
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };

        const pushNotification = () => {
            setNotifications(data1);
            // console.log("Notification ", notifications);
        }

        getLocation();
        const intervalId = setInterval(() => {
            getLocation()
            // pushNotification()
        }, 5000);

        return () => {
            newSocket.disconnect();
            clearInterval(intervalId);
        };
    }, []);

    // const data = ["Hi", "Hello", "Hi", "Hello"]

    const getcurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        const currentTime = `${hours}:${minutes}:${seconds}`;
        return currentTime
    }

    return (
        <div>
            <p>Current Time: {getcurrentTime()}</p>
            {location && (<>
                <p>
                    Current Location: Latitude: {location.latitude}, Longitude: {location.longitude}
                </p>
                <MapContainer className="leaflet-map"
                    style={{ height: "45vh" }}
                    center={[location.latitude, location.longitude]}
                    zoom={13} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        // '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png"
                    />
                    <Marker position={[location.latitude, location.longitude]} icon={icon}>
                        <Popup>Your Location</Popup>
                    </Marker>
                </MapContainer>


            </>
            )}
            {/* {notifications.map((notification, index) => ( */}

                { notifications.type }

         {/* ))} */}

        </div>
    )
}

export default User