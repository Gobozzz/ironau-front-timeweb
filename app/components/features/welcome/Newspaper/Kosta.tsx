"use client";

import { useRef } from "react";
import styles from "./Newspaper.module.css";
import Image from "next/image";

import KostaImage from "@/public/images/kosta.jpg";

interface Props {}

export function Kosta({}: Props) {
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
    <div className={styles.kosta}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.main_video_flow}
      ></div>
      <Image
        ref={imgRef}
        className={styles.main_video_preview}
        src={KostaImage}
        alt="Коста Хетагуров"
      />
      <video
        ref={videoRef}
        playsInline
        muted
        className={styles.main_video_video}
        preload="metadata"
      >
        <source src="/videos/kosta.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
