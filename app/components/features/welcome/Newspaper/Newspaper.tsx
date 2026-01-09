"use client";

import Typewriter from "@/app/components/shared/Typewriter/Typewriter";
import { Kosta } from "./Kosta";
import styles from "./Newspaper.module.css";
import { Panarama } from "./Panarama";
import { Prospekt } from "./Prospekt";
import { anekdots, middle_items, middle_items_2 } from "./data";

interface Props {}

export function Newspaper({}: Props) {
  let delay_main_items = 650;
  let delay_anekdots = 950;
  let delay_main_items_2 = 1800;

  return (
    <div className={styles.paper}>
      <div className={styles.main}>
        <div className={styles.main_up}>
          <div className={styles.paper_info}>
            <Typewriter
              initialDelay={100}
              text="№19, выпуск 10"
              className={styles.paper_info_number}
            />
            <Typewriter
              initialDelay={150}
              text="Полоса А1"
              className={styles.paper_info_polosa}
            />
            <Typewriter
              initialDelay={200}
              text="17.12.2025"
              className={styles.paper_info_date}
            />
            <div className={styles.paper_info_line}></div>
            <Typewriter
              initialDelay={250}
              text="Осетинский язык. Online"
              className={styles.paper_info_name}
            />
          </div>
          <Typewriter
            speed={100}
            initialDelay={400}
            text="Дзурут Иронау"
            className={styles.up_title}
          />
        </div>
        <div className={styles.main_middle}>
          <Typewriter
            speed={25}
            initialDelay={500}
            text="«весь мир-мой храм, любовь-моя святыня, вселенная-отечество моё»"
            className={styles.main_bloquate}
          />
          <div className={styles.main_middle_items}>
            {middle_items.map((item, index) => (
              <Typewriter
                key={index}
                speed={2}
                initialDelay={(delay_main_items += 400)}
                text={item}
                className={`${styles.main_middle_item} line-clamp-12`}
              />
            ))}
          </div>
        </div>
        <Prospekt />
        <div className={styles.main_middle}>
          <Typewriter
            speed={25}
            initialDelay={1800}
            text="Язык, похожий на древнюю книгу
с золотыми буквами... 
Основа нашей национальной самобытности, 
нашего сознания и наших корней."
            className={styles.main_bloquate_small}
          />
          <div className={styles.main_middle_items}>
            {middle_items_2.map((item, index) => (
              <Typewriter
                key={index}
                speed={2}
                initialDelay={(delay_main_items_2 += 400)}
                text={item}
                className={`${styles.main_middle_item} line-clamp-12`}
              />
            ))}
          </div>
        </div>
        <div className={styles.main_other_videos}>
          <Kosta />
          <Panarama />
        </div>
      </div>
      <div className={styles.aside}>
        <Typewriter
          initialDelay={550}
          text={"Цалдæр <br /> анекдоты"}
          className={styles.aside_title}
        />
        <Typewriter
          initialDelay={650}
          text="***"
          className={styles.aside_starts}
        />
        {anekdots.map((item, index) => (
          <div key={index}>
            <Typewriter
              speed={2}
              initialDelay={(delay_anekdots += 100)}
              text={item}
              className={styles.aside_item}
            />
            <Typewriter
              speed={25}
              initialDelay={(delay_anekdots += 100)}
              text="***"
              className={styles.aside_starts}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
