"use client";

import { AppDispatch } from "@/app/redux/store";
import { logout } from "@slices/authSlice";
import { useDispatch } from "react-redux";
import logoutIcon from "@/public/icons/logout.svg";

import styles from "./LogoutButton.module.css";
import Image from "next/image";

interface Props {
  className?: string;
}

export function LogoutButton({ className = "" }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button
      aria-label="Выход из личного кабинета"
      className={`${styles.button} ${className}`}
      onClick={() => dispatch(logout())}
    >
      <Image src={logoutIcon} alt="Выход" />
    </button>
  );
}
