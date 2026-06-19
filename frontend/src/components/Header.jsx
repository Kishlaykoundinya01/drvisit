import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Header = () => {
    return (
        <div className="gradient-bg rounded-3xl overflow-hidden mt-6">
            <div className="grid lg:grid-cols-2 gap-8 px-8 md:px-14 lg:px-20 py-12 md:py-20">

                <div className="flex flex-col justify-center">
                    <span className="bg-white/20 text-white px-4 py-2 rounded-full w-fit mb-6">
                        Trusted Healthcare Platform
                    </span>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold text-white leading-tight"
                    >
                        Your Health,
                        <br />
                        Our Priority
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: .3 }}
                        className="text-white/90 mt-6 text-lg"
                    >
                        Connect with experienced specialists, book appointments
                        instantly, and receive quality healthcare from trusted
                        professionals.
                    </motion.p>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <a
                            href="#speciality"
                            className="bg-white text-sky-600 px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
                        >
                            Book Appointment
                        </a>

                        <button className="border border-white text-white px-8 py-4 rounded-full">
                            Learn More
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mt-12">
                        <div>
                            <h3 className="text-3xl font-bold text-white">50+</h3>
                            <p className="text-white/80">Doctors</p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-white">10K+</h3>
                            <p className="text-white/80">Appointments</p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-white">98%</h3>
                            <p className="text-white/80">Satisfaction</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-end">
                    <motion.img
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        src={assets.header_img}
                        alt=""
                        className="w-full max-w-lg drop-shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;