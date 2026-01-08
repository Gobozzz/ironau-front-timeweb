"use client";

import React, { useEffect, useRef, useState } from "react";
import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Input } from "./Input/Input";
import { Result } from "./Result/Result";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { closeModal } from "@slices/searchModalSlice";
import api from "@api";
import Image from "next/image";
import KrestIcon from "@/public/icons/krest-close.svg";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GlobalSearchModal() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.searchModal.isOpen
  );

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [mounted, setMounted] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchItems, setSearchItems] = useState<Array<IGlobalSearchItem>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSearchItems([]);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    const value = searchText.trim();
    if (value.length > 0) {
      setLoading(true);
      debounceTimeout.current = setTimeout(() => {
        api
          .get(`/search/global?text=${value}`)
          .then((data) => {
            setSearchItems(data.data.data);
          })
          .finally(() => setLoading(false));
      }, 500);
    } else {
      setLoading(false);
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchText]);

  const handleClose = () => dispatch(closeModal());
  const handleInput = function (value: string) {
    setSearchText(value);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={false}
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
            maxWidth: "1440px",
            height: "90vh",
            background: "var(--white)",
            borderRadius: "16px",
            overflowY: "hidden",
            "@media(max-width: 1460px)": {
              maxWidth: "90%",
            },
            "@media(max-width: 800px)": {
              height: "100vh",
              maxHeight: "100vh",
              maxWidth: "100%",
              borderRadius: "0",
              margin: "0",
            },
          },
        }}
      >
        <div className="h-full flex flex-col gap-8 p-5 max-[800px]:gap-3 max-[800px]:pt-5 max-[800px]:pb-3 max-[800px]:px-2.5">
          <div>
            <div className="hidden mb-2 max-[800px]:block">
              <button
                onClick={handleClose}
                className="flex! items-center justify-center min-h-11 min-w-11 ml-auto"
                type="button"
              >
                <Image src={KrestIcon} alt="Закрыть" />
              </button>
            </div>
            <Input value={searchText} callback={handleInput} />
          </div>
          <Result
            loading={loading}
            searchText={searchText.trim()}
            searchItems={searchItems}
          />
        </div>
      </Dialog>
    </>
  );
}
