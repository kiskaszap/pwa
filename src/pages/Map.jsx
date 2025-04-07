
import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
  Polyline,
} from "react-leaflet";
import * as turf from "@turf/turf";
import L from "leaflet";
import { toast } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import tasks from "../utils/tasks";

const defaultIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const userIcon = (selfie) =>
  new L.Icon({
    iconUrl:
      selfie ||
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [35, 35],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
    className: "rounded-full border-2 border-white",
  });

const uwsPolygonCoords = [
  [55.84418031411532, -4.432650757416809],
  [55.844198385079515, -4.432382536523798],
  [55.84424657427633, -4.4318568235734945],
  [55.84436704700695, -4.431363297130353],
  [55.844692321514756, -4.430429888422673],
  [55.84493326385197, -4.429635954517981],
  [55.84496940507192, -4.429399920132131],
  [55.84504168741101, -4.428820563003225],
  [55.84463208571226, -4.428487969095892],
  [55.84474051011138, -4.427876425459825],
  [55.84463810929794, -4.427747679431179],
  [55.84468629794962, -4.427458000866726],
  [55.84465015646645, -4.427447272031006],
  [55.84457184980434, -4.427468729702447],
  [55.84443933047826, -4.427661848745415],
  [55.844421259626074, -4.427844238952663],
  [55.84435499976284, -4.428241205874321],
  [55.843957438211646, -4.427940798474148],
  [55.84361408632723, -4.427339983673801],
  [55.843650228773654, -4.427050305109349],
  [55.843144231465786, -4.427050305109349],
  [55.84298158807522, -4.427425814359565],
  [55.842935426362914, -4.427395461139532],
  [55.84249057198987, -4.427155926243041],
  [55.842392289507146, -4.429671042662015],
  [55.842050885323985, -4.4296341911394785],
  [55.84202502124825, -4.430684459580997],
  [55.842345734567495, -4.430739736864803],
  [55.84227331566252, -4.432582313037662],
  [55.84306651121979, -4.43244411225415],
  [55.843363955381406, -4.432405723147619],
  [55.8433682661584, -4.432413400978873],
  [55.843596736190044, -4.432451790085404],
  [55.844200235486674, -4.432666769093141],
  [55.84418031411532, -4.432650757416809],
];

const FitToBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 17 });
  }, [map, bounds]);
  return null;
};

const Map = () => {
  const [userPos, setUserPos] = useState(null);
  const [routeTo, setRouteTo] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const shownTaskIds = useRef(new Set());
  const wasInsideRef = useRef(false);

  const email = localStorage.getItem("uws_user");
  const selfie = email ? localStorage.getItem(`userSelfie-${email}`) : null;
  const completed = email ? JSON.parse(localStorage.getItem(`completedTasks-${email}`) || "[]") : [];
  const failed = email ? JSON.parse(localStorage.getItem(`failedTasks-${email}`) || "[]") : [];

  const polygon = turf.polygon([
    uwsPolygonCoords.map(([lat, lng]) => [lng, lat]),
  ]);

  const leafletBounds = L.latLngBounds(uwsPolygonCoords);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      toast.error("You are offline");
      return;
    }

    const useMock = false;
    const mockCoords = [55.84258479601383, -4.428774845941453] 


    const handleCoords = (lat, lng) => {
      const point = turf.point([lng, lat]);
      const inside = turf.booleanPointInPolygon(point, polygon);
      setUserPos([lat, lng]);

      if (inside) {
        if (!wasInsideRef.current) {
          toast.success(" Inside UWS area");
          wasInsideRef.current = true;
        }

        tasks.forEach((task) => {
          const taskPoint = turf.point([task.coords[1], task.coords[0]]);
          const dist = turf.distance(point, taskPoint, { units: "meters" });

          if (
            dist <= 10 &&
            !shownTaskIds.current.has(task.id) &&
            !completed.includes(task.id) &&
            !failed.includes(task.id)
          )  {
            shownTaskIds.current.add(task.id);
            toast.success(` Task available at ${task.name}`);
            window.location.href = `/task/${task.id}`;
          }
        });
      } else {
        if (wasInsideRef.current) wasInsideRef.current = false;
        toast.error(" Outside UWS");
      }
    };

    if (useMock) {
      handleCoords(...mockCoords);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => handleCoords(pos.coords.latitude, pos.coords.longitude),
        () => toast.error(" Failed to fetch location")
      );
    }
  }, [isOnline]);

  if (!isOnline) {
    return (
      <div className="h-[calc(100vh-64px)] w-full bg-[#1d1e3c] flex items-center justify-center text-center text-white px-4">
        <h1 className="text-2xl font-bold">To access this feature, please connect to the internet.</h1>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pt-0 pb-16 z-0 overflow-hidden">
      <MapContainer
        center={[55.8434, -4.4292]}
        zoom={16}
        scrollWheelZoom
        className="w-full h-full"
      >
        <FitToBounds bounds={leafletBounds} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Polygon positions={uwsPolygonCoords} pathOptions={{ color: "teal" }} />

        {tasks.map((task) => {
          const isDone = completed.includes(task.id);
          const isFailed = failed.includes(task.id);
          const markerIcon = isDone ? greenIcon : isFailed ? redIcon : defaultIcon;

          return (
            <Marker key={task.id} position={task.coords} icon={markerIcon}>
              <Popup>
                <div>
                  <p className="font-bold">{task.name}</p>
                  <button
                    className="btn btn-sm btn-primary mt-2"
                    onClick={() => {
                      if (userPos) {
                        setRouteTo([task.coords, userPos]);
                      } else {
                        toast.error("User location unknown");
                      }
                    }}
                  >
                    Navigate
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {userPos && (
          <Marker position={userPos} icon={userIcon(selfie)}>
            <Popup>📍 Your Location</Popup>
          </Marker>
        )}

        {routeTo && (
          <Polyline positions={[routeTo[1], routeTo[0]]} color="blue" />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
