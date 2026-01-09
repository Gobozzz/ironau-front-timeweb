"use client";

import { PROFILE } from "@navigate";
import styles from "./ProfileLink.module.css";
import Link from "next/link";
import { useEffect } from "react";
import iconLk from "@/public/icons/lk.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { notRedirectingProfile } from "@slices/authSlice";
import { useRouter } from "next/navigation";
import { openModal } from "@/app/redux/slices/loginModalSlice";

interface Props {
  className?: string;
  callbackClick?: () => void;
}

export function ProfileLink({ className = "", callbackClick }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, canRedirectedProfile } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (canRedirectedProfile) {
      dispatch(notRedirectingProfile());
      router.push(PROFILE);
    }
  }, [canRedirectedProfile, dispatch, router]);

  if (user) {
    return (
      <Link href={PROFILE} className={`${styles.item} ${className}`}>
        <Image src={iconLk} alt="Личный кабинет" />
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          if (callbackClick !== undefined) {
            callbackClick();
          }
          dispatch(openModal());
        }}
        className={`${styles.item} ${className}`}
        aria-label="Личный кабинет"
      >
        <Image src={iconLk} alt="Личный кабинет" />
      </button>
    </>
  );
}
