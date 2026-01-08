"use client";

import styles from "./Newspaper.module.css";
import Image from "next/image";
import ProspektImage from "@/public/images/paper-prospekt-black.png";
import { useRef } from "react";

interface Props {}

export function Prospekt({}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null); // если используете правильный компонент для Image

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // при необходимости начать заново
      videoRef.current.play();
    }
    if (imgRef.current) {
      imgRef.current.style.display = "none"; // скрываем изображение
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // сбросить видео
    }
    if (imgRef.current) {
      imgRef.current.style.display = "block"; // показываем изображение
    }
  };

  return (
    <div className={styles.main_video}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.main_video_flow}
      ></div>
      <Image
        ref={imgRef}
        className={styles.main_video_preview}
        src={ProspektImage}
        alt="Проспект мира, г. Владикавказ"
      />
      <video
        ref={videoRef}
        playsInline
        muted
        className={styles.main_video_video}
        preload="metadata"
      >
        <source src="/videos/prospekt.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
