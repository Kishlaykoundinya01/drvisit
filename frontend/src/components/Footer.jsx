import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="mt-24">

      {/* Appointment CTA */}

      <div className="bg-sky-600 rounded-t-[40px] px-8 md:px-16 py-12 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Book Your Appointment Today
        </h2>

        <p className="text-sky-100 mt-4 max-w-2xl mx-auto">
          Connect with experienced doctors, book appointments instantly,
          and receive quality healthcare from trusted professionals.
        </p>

        <button
          onClick={() => navigate("/doctors")}
          className="
            mt-6
            bg-white
            text-sky-600
            px-8
            py-3
            rounded-full
            font-semibold
            hover:scale-105
            transition-all
          "
        >
          Find Doctors
        </button>

      </div>

      {/* Main Footer */}

      <div className="bg-slate-900 text-white">

        <div className="max-w-7xl mx-auto px-8 md:px-12 py-16">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

            {/* Brand */}

            <div>

              <div className="flex items-center gap-3 mb-5">

                <div className="w-14 h-14 bg-white rounded-xl overflow-hidden">
                  <img
                    src={assets.logo}
                    alt="DrVisit"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    DrVisit
                  </h2>

                  <p className="text-slate-400 text-sm">
                    Healthcare Platform
                  </p>
                </div>

              </div>

              <p className="text-slate-400 leading-7">
                DrVisit simplifies healthcare by helping patients
                connect with trusted specialists and manage
                appointments seamlessly.
              </p>

            </div>

            {/* Quick Links */}

            <div>

              <h3 className="font-semibold text-lg mb-5">
                Quick Links
              </h3>

              <ul className="space-y-3 text-slate-400">

                <li
                  onClick={() => navigate("/")}
                  className="hover:text-white cursor-pointer transition"
                >
                  Home
                </li>

                <li
                  onClick={() => navigate("/doctors")}
                  className="hover:text-white cursor-pointer transition"
                >
                  Doctors
                </li>

                <li
                  onClick={() => navigate("/about")}
                  className="hover:text-white cursor-pointer transition"
                >
                  About Us
                </li>

                <li
                  onClick={() => navigate("/contact")}
                  className="hover:text-white cursor-pointer transition"
                >
                  Contact
                </li>

              </ul>

            </div>

            {/* Services */}

            <div>

              <h3 className="font-semibold text-lg mb-5">
                Services
              </h3>

              <ul className="space-y-3 text-slate-400">

                <li>Doctor Consultation</li>
                <li>Online Appointment Booking</li>
                <li>Specialist Care</li>
                <li>Health Assistance</li>

              </ul>

            </div>

            {/* Contact */}

            <div>

              <h3 className="font-semibold text-lg mb-5">
                Contact Us
              </h3>

              <div className="space-y-4 text-slate-400">

                <p>
                  📍 Patna, Bihar, India
                </p>

                <p>
                  📞 +91 98765 43210
                </p>

                <p>
                  ✉ support@drvisit.com
                </p>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                  "
                >
                  🚑 Emergency Support
                </div>

              </div>

            </div>

          </div>

        </div>

        

        {/* Bottom */}

        <div className="border-t border-slate-800">

          <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-slate-500 text-sm">
              © 2026 DrVisit. All Rights Reserved.
            </p>

            <div className="flex gap-4 text-slate-500 text-sm">

              <span className="hover:text-white cursor-pointer">
                Privacy Policy
              </span>

              <span className="hover:text-white cursor-pointer">
                Terms of Service
              </span>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;