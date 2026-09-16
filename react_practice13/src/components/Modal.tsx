import { useEffect, useRef } from "react";
import { useEventListener } from "../hooks/useEventListener";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // 1. React의 isOpen 상태와 브라우저 native <dialog> 메서드 동기화
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal(); // 최상단 레이어에 모달띄우기
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // 2. ESC키 감지 시 React 상태를 변경하여 닫기 처리
  useEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen) {
      onClose();
    }
  });

  return (
    <dialog
      ref={dialogRef}
      style={{
        padding: "2rem",
        borderRadius: "12px",
        border: "none",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      {children}
      <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
        <button
          onClick={onClose}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#0070f3",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          닫기
        </button>
      </div>
    </dialog>
  );
}
