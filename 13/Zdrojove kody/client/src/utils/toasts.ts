import { toast } from "react-toastify";

export function toastifySuccess(text: string) {
  toast.success(`${text}`, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      padding: "7px 30px",
      borderRadius: "10px",
      fontWeight: "500",
      color: "seagreen",
    },
    bodyStyle: {
      gap: 10,
    },
  });
}

export function toastifyError(text: string) {
  toast.error(`${text}`, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      padding: "7px 30px",
      borderRadius: "10px",
      fontWeight: "500",
      color: "tomato",
    },
    bodyStyle: {
      gap: 10,
    },
  });
}
