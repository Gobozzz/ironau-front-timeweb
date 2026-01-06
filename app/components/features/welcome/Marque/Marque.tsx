"use client";

import styles from "./Marque.module.css";

interface MarqueeProps {
  className?: string;
}

export const Marquee = ({ className = "" }: MarqueeProps) => {
  return (
    <div className={`${styles.marquee} ${className}`}>
      <div className={styles.track}>
        <div className={styles.content}>
          ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ ног Хабæрттæ
        </div>
      </div>
    </div>
  );
};
