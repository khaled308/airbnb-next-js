"use client";
import React, { useCallback, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface Props {
  isOpen?: boolean;
  disabled?: boolean;
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  actionLabel?: string;
  secondaryActionLabel?: string;
  onSubmit: () => void;
  onClose: () => void;
  secondaryAction?: () => void;
}

const Modal = ({
  isOpen,
  disabled,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}: Props) => {
  const [showModel, setShowModel] = useState(isOpen);

  const handelClose = useCallback(() => {
    if (disabled) return;

    setShowModel(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handelSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden fixed inset-0 z-50 bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 h-full md:h-auto my-6 mx-auto">
          <div
            className={`
            transition 
            duration-300 
            h-full 
            ${showModel ? "translate-y-0" : "translate-y-full"}
            ${showModel ? "opacity-100" : "opacity-0"}  
            `}
          >
            <div className="rounded-lg shadow-lg h-full md:h-auto w-full bg-white">
              {/* header */}
              <div className="flex items-center justify-center rounded-t border-b p-6 relative">
                <button
                  className="p-1 absolute left-9 transition hover:opacity-0"
                  onClick={handelClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* body */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* footer */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex items-center w-full gap-4">
                  {secondaryAction && secondaryActionLabel && (
                    <button
                      disabled={disabled}
                      className="btn btn-outline"
                      onClick={secondaryAction}
                    >
                      {secondaryActionLabel}
                    </button>
                  )}
                  <button
                    disabled={disabled}
                    onClick={handelSubmit}
                    className="btn btn-primary"
                  >
                    {actionLabel ?? "Submit"}
                  </button>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
