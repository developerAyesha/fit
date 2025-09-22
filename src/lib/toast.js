import { toast as rtToast } from "react-toastify";

export const toast = {
  success: (message, options) => rtToast.success(message, options),
  error: (message, options) => rtToast.error(message, options),
  info: (message, options) => rtToast.info(message, options),
  warning: (message, options) => rtToast.warning(message, options),
  loading: (message, options) => rtToast.loading(message, options),
  dismiss: (id) => rtToast.dismiss(id),
};


