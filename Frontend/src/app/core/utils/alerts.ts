import Swal from 'sweetalert2';

export default class Alerts {
  /**
   * Este metodo muestra un pop-up simple.
   * @param message [string] Mensaje a mostrar
   * @param type [error | info | question | success | warning] Tipo de pop-up
   */
  static simpleToast(
    message: string,
    type: 'error' | 'info' | 'question' | 'success' | 'warning'
  ) {
    SimpleToast.fire({
      icon: type,
      title: message,
    });
  }

  static promiseConfirm(title: string, description: string) {
    return Swal.fire({
      title: title,
      text: description,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#51c007',
      cancelButtonColor: '#e61111',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });
  }

  static simpleAlert(title: string, description: string, type: 'error' | 'info' | 'question' | 'success' | 'warning') {
    Swal.fire({
      title: title,
      text: description,
      icon: type,
    });
  }
}

/**
 * Configuracion del pop-up simple
 */
const SimpleToast = Swal.mixin({
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
