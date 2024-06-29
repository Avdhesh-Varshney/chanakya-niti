import React from "react";
import "../css/Home.css";
import { ReactTyped } from "react-typed";
import VideoButton from "../components/Home/VideoButton";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Introduction */}
      <div className="home-container">
        <div className="flex flex-col item-center justify-center w-full">
          <h1 className="font-bold home-heading">चाणक्य नीति</h1>
          <div className="font-bold">
            <ReactTyped
              strings={[
                "शक्तिशाली मन को कोई नहीं हरा सकता।",
                "मनुष्य कर्म से महान होता है, जन्म से नहीं।",
                "विनम्रता आत्मसंयम का मूल है।",
              ]}
              typeSpeed={100}
              loop
              backSpeed={30}
              cursorChar=">"
              showCursor={true}
            />
          </div>
        </div>
        <div className="img-container">
          <img className="animated-img" src="/home1.png" alt="" />
        </div>
      </div>

      <div className="feat-2">
        <div className="feat-card">
          <img src="/e-book.jpeg" alt="" />
          <div className="card-line" />
          <div className="feat-card-content">
            <h5>Dive into the World of Chanakya through E-Books</h5>
            <p>
              Discover the profound wisdom of Chanakya with our meticulously
              curated e-books. Each page offers a gateway into the timeless
              teachings of this ancient sage, providing you with insights and
              strategies that remain relevant in today’s world.
            </p>
          </div>
        </div>
        <div className="flex flex-col item-center justify-center gap-10">
          <VideoButton />
          <div className="flex flex-col item-center justify-center">
            <h4 className=" font-bold">MULTIMEDIA CONTENT</h4>
            <p className=" font-semibold">
              Audio Files, Books, Videos on Chanakya’s Life
            </p>
          </div>
        </div>
        <div className="feat-card">
          <img src="/video.jpg" alt="" />
          <div className="card-line" />
          <div className="feat-card-content">
            <h5>Video and Audio Experiences</h5>
            <p>
              Immerse yourself in the wisdom of Chanakya through our captivating
              blend of video and audio content. Explore his timeless teachings
              with clarity and depth, as every word and gesture comes alive,
              enriching your journey of learning and discovery.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="feat-3">
        <div className="feat-card-2">
          <div className="flex item-center gap-2 justify-center">
            <img src="/ai.svg" alt="" />
            <h5 className=" font-bold">AI-Powered Translations</h5>
          </div>
          <p>
            Explore the world without boundaries with our AI-powered language
            translation. Break down language barriers effortlessly as our
            advanced technology seamlessly transforms content into your
            preferred language. Whether you're discovering ancient wisdom or
            connecting with global insights, our translation AI ensures every
            word resonates, bridging cultures and uniting minds.
          </p>
        </div>
      </div>
    </div>
  );
}
