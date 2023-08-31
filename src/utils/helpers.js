import Swal from 'sweetalert2'

export const Reminder = Swal.mixin({
  position: 'top-end',
  showConfirmButton: false,
  timerProgressBar: true,
  timer: 3000,
})
