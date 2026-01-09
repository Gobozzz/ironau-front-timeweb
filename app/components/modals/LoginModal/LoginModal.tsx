"use client";

import React, { useEffect, useState } from "react";
import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import styles from "./LoginModal.module.css";
import { RegisterForm } from "./Form/RegisterForm";
import { LoginForm } from "./Form/LoginForm";
import loginImage from "@/public/images/login_modal.png";
import registerImage from "@/public/images/register_modal.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { closeModal } from "@/app/redux/slices/loginModalSlice";
import KrestIcon from "@/public/icons/krest-close.svg";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {}

export default function LoginModal({}: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const { isOpen } = useSelector((state: RootState) => state.loginModal);
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<"register" | "login">("login");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function handleClose() {
    dispatch(closeModal());
  }

  if (!isClient || user) {
    return null;
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={false}
        scroll="body"
        keepMounted
        slots={{
          transition: Transition,
        }}
        sx={{
          "& .MuiDialog-container": {
            justifyContent: "center",
          },
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "1000px",
            background: "var(--white)",
            borderRadius: "12px",
            "@media(max-width: 1199px)": {
              maxWidth: "100%",
              margin: "0",
              maxHeight: "90vh",
            },
          },
        }}
      >
        <div className="h-full flex items-stretch relative">
          <div className="hidden max-[1200px]:block">
            <button
              onClick={handleClose}
              className="absolute top-4 right-2.5 min-w-11 min-h-11 flex! items-center justify-center"
              type="button"
            >
              <Image src={KrestIcon} alt="Закрыть" />
            </button>
          </div>
          <div className={styles.left_part}>
            <div className={styles.title}>ЛИЧНЫЙ КАБИНЕТ</div>
            <div className={styles.tabs}>
              <button
                onClick={() => setActiveTab("register")}
                className={`${styles.tab} ${
                  activeTab === "register" ? styles.active : ""
                }`}
              >
                Регистрация
              </button>
              <button
                onClick={() => setActiveTab("login")}
                className={`${styles.tab} ${
                  activeTab === "login" ? styles.active : ""
                }`}
              >
                Авторизация
              </button>
            </div>
            {activeTab === "register" && <RegisterForm />}
            {activeTab === "login" && <LoginForm />}
          </div>
          <div className={styles.right_part}>
            <Image
              src={activeTab === "register" ? registerImage : loginImage}
              alt="Фото Осетии"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
