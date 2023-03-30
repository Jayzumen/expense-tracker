"use client";

import { Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return (
    <>
      <div
        style={{
          transform: isOpen ? "translateX(0%)" : "translateX(-200%)",
        }}
        className="absolute top-0 left-0 z-10 w-full h-full min-h-screen transition-all duration-500 ease-in-out bg-black/30"
      >
        <div className="container mx-auto max-w-2xl min-h-[80vh] rounded-3xl bg-slate-800 p-4">
          <button
            aria-label="Close modal"
            onClick={() => setIsOpen(false)}
            className="transition rounded-full bg-slate-500 hover:scale-105 hover:text-slate-600"
          >
            <AiOutlineClose size={25} className="m-2 rounded-full" />
          </button>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
