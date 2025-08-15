// src/Components/About.jsx
import React from "react";

const About = () => {
  return (
    <section className="bg-white text-gray-800 py-16 font-sans">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-start gap-12">
        {/* Text Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ff003c] mb-6">
            আমাদের সম্পর্কে ✨
          </h2>

          <p className="text-gray-700 text-lg">
            <span className="font-semibold text-[#ff003c]">Neev</span> এ আমরা
            বিশ্বাস করি, ফ্যাশন শুধু পোশাক নয়—এটি একটি{" "}
            <span className="text-[#ff003c] font-semibold">
              স্টাইলিশ অভিজ্ঞতা
            </span>{" "}
            💃🕺। আমাদের লক্ষ্য হলো এক্সক্লুসিভ এবং উচ্চমানের পোশাক সরাসরি আপনার
            দরজায় পৌঁছে দেওয়া, যাতে প্রতিটি গ্রাহক
            <span className="font-semibold text-[#ff003c]">
              {" "}
              আত্মবিশ্বাসী, স্টাইলিশ এবং অনন্য
            </span>{" "}
            অনুভব করেন।
          </p>

          <p className="text-gray-700 text-lg">
            আমরা গুণমানের ক্ষেত্রে কোন রকম{" "}
            <span className="font-semibold text-[#ff003c]">কম্প্রমাইজ ❌</span>{" "}
            করি না। প্রতিটি পোশাক যত্নসহকারে তৈরি করা হয়, যাতে আপনার বিনিয়োগ
            দীর্ঘস্থায়ী এবং প্রিমিয়াম মানের হয়। প্রিমিয়াম উপকরণ 🧵, টেকসই
            প্র্যাকটিস 🌱 এবং বিস্তারিত মনোযোগ আমাদের ব্র্যান্ডকে{" "}
            <span className="font-semibold text-[#ff003c]">বিশ্বস্ত</span> করে
            তোলে।
          </p>

          <p className="text-gray-700 text-lg">
            গ্রাহক সন্তুষ্টি আমাদের সর্বোচ্চ অগ্রাধিকার 🏆। দ্রুত ডেলিভারি 🚚,
            নিরবচ্ছিন্ন অনলাইন শপিং 🛒 এবং চমৎকার কাস্টমার সাপোর্ট 🤝 নিশ্চিত
            করে যে আপনার যাত্রা
            <span className="font-semibold text-[#ff003c]">
              {" "}
              সহজ এবং আনন্দদায়ক
            </span>{" "}
            হবে।
            <span className="font-semibold text-[#ff003c]">Neev</span> এর সঙ্গে
            আপনি শুধু পোশাক কিনছেন না—আপনি একটি
            <span className="text-[#ff003c] font-semibold">
              {" "}
              স্টাইল এবং মানের কমিউনিটিতে
            </span>{" "}
            যুক্ত হচ্ছেন 💖।
          </p>

          {/* CTA Button */}
          <a
            href="/"
            className="inline-block bg-[#ff003c] hover:bg-[#e60036] text-white font-semibold py-3 px-6 rounded-md transition-all duration-300"
          >
            আমাদের কালেকশন দেখুন 🛍️
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
