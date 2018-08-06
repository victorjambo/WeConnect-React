import { toast } from 'react-toastify';

/**
 * notify toast definations
 * @param {string} type
 * @param {string} message
 * @return {*} switch cases
 */
const notify = (type, message) => {
  switch (type) {
  case 'info':
    toast.info(message, { className: 'notify-top' });
    break;
  case 'success':
    toast.success(message, { className: 'notify-top' });
    break;
  case 'warning':
    toast.warning(message, { className: 'notify-top' });
    break;
  case 'error':
    toast.error(message, { className: 'notify-top' });
    break;
  default:
    toast('WeConnect!', { className: 'notify-top' });
  }
};

export default notify;
