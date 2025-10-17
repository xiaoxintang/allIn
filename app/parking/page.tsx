"use client";
import { useEffect, useState } from "react";
const headers = {
  "tenant-id": "1",
  authorization:
    "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6Im9xVmdlMDlQYkxMZlkxQVVZR1FpRWQ1dU9hSlkifQ.GhBfmt8mGpcd7VPDZiIxllUAFzSzi-tz_7jScnnqkCvNVLj9BaUxPNllMcKJ8YCb-LAScMYvuH10q5eTc4vNcg",
};
export default function ParkingPage() {
  const [carList, setCarList] = useState<any[]>([]);
  const getParkingRecord = async (cardItem: any) => {
    const response = await fetch(
      `/api/wx/park/car/parking/list?pageNum=1&pageSize=999&bindingId=${cardItem.bindingId}&carId=${cardItem.carId}&geoId=`,
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  };
  const getMyCarList = async () => {
    const response = await fetch("/api/parking/wx/park/car/binding/list", {
      method: "GET",
      headers,
    });
    const data = await response.json();
    console.log(data);
    const carList = data.data;
    setCarList(carList);
  };
  useEffect(() => {
    getMyCarList();
  }, []);
  return (
    <div>
      <div>一键缴费</div>
      <div>
        {carList.map((car: any) => (
          <>
            <div key={car.carId}>{car.carNo}</div>
            <div onClick={() => getParkingRecord(car)}>获取停车记录</div>
          </>
        ))}
      </div>
    </div>
  );
}
