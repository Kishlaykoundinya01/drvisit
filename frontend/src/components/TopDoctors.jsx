import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <section className="my-24">
      <div className="text-center mb-12">
        <h2 className="section-title">
          Meet Our Specialists
        </h2>

        <p className="section-subtitle mt-3">
          Highly qualified doctors with years of experience
          ready to provide exceptional healthcare.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {doctors.slice(0, 8).map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => navigate(`/appointment/${doctor._id}`)}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer"
          >
            <img
              src={doctor.image}
              className="h-72 w-full object-cover"
              alt=""
            />

            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    doctor.available
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {doctor.available
                    ? "Available"
                    : "Unavailable"}
                </span>

                <span className="text-yellow-500">
                  ★ 4.9
                </span>
              </div>

              <h3 className="font-bold text-lg">
                {doctor.name}
              </h3>

              <p className="text-slate-500">
                {doctor.speciality}
              </p>

              <button className="w-full mt-5 bg-sky-500 text-white py-3 rounded-xl">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDoctors;