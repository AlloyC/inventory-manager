"use client";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HighlightSection from "@/components/HighlightSection";
import PreFooter from "@/components/PreFooter";
import Preloader from "@/components/Preloader";
import ProcessSection from "@/components/ProcessSection";
import Showcase from "@/components/Showcase";
import Testimonies from "@/components/Testimonies";
import Trust from "@/components/Trust";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const images = Array.from(document.images);

  //   if (images.length === 0) {
  //     return;
  //   }

  //   let loadedCount = 0;
  //   const handleLoad = () => {
  //     loadedCount++;
  //     if (loadedCount >= 6) {
  //       setLoading(false);
  //       console.log("at least 6 images loaded");
  //     }
  //   };

  //   images.forEach((img) => {
  //     if (img.complete) {
  //       handleLoad();
  //     } else {
  //       img.addEventListener("load", handleLoad);
  //       img.addEventListener("error", handleLoad);
  //     }
  //   });
  //   return () => {
  //     images.forEach((img) => {
  //       img.removeEventListener("load", handleLoad);
  //       img.removeEventListener("error", handleLoad);
  //     });
  //   };
  // }, []);
  return (
    <>
      {/* {loading && <Preloader />} */}
      <div>
        <HeroSection />
        <Trust />
        <HighlightSection />
        <ProcessSection />
        <Showcase />
        <Testimonies />
        <PreFooter />
        <Footer />
      </div>
    </>
  );
}
