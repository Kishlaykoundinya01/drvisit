import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div className="space-y-8">

      <Header />

      <SpecialityMenu />

      <TopDoctors />

      <section className="bg-white rounded-3xl p-10 shadow-sm">
        <div className="text-center">
          <h2 className="section-title">
            Why Choose DrVisit?
          </h2>

          <p className="section-subtitle mt-3">
            Designed to make healthcare faster,
            easier and more accessible.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-12">

          <div className="p-6 rounded-2xl bg-sky-50">
            <h3 className="font-bold mb-2">
              Verified Doctors
            </h3>
            <p>
              Qualified specialists across
              multiple domains.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-sky-50">
            <h3 className="font-bold mb-2">
              Secure Payments
            </h3>
            <p>
              Safe online transactions using
              Razorpay.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-sky-50">
            <h3 className="font-bold mb-2">
              Instant Booking
            </h3>
            <p>
              Book appointments within seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-sky-50">
            <h3 className="font-bold mb-2">
              Trusted Care
            </h3>
            <p>
              Patient-first healthcare experience.
            </p>
          </div>

        </div>
      </section>

      <Banner />
    </div>
  );
};

export default Home;