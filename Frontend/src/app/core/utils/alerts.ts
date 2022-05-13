import Swal from 'sweetalert2';

export default class Alerts {
  static simpleErrorToast(message:string, type:'error'|'info'|'question'|'success'|'warning') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 2200,
      timerProgressBar: true,
    });
    
    Toast.fire({
      icon: type,
      title: message,
    });
  }
}
