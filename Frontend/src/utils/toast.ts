import { toast as rToast, ToastOptions } from "react-toastify";
const toastoptions: ToastOptions = {
	position: "bottom-left",
	autoClose: 1000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: true,
	progress: undefined,
}
export const toast = {
	success: (message: string) => {
		rToast.success(message, toastoptions);
	},
	error: (message: string) => {
		rToast.error(message, toastoptions);
	},
	info: (message: string) => {
		rToast.info(message, toastoptions);
	},
	warn: (message: string) => {
		rToast.warn(message, toastoptions);
	}
}