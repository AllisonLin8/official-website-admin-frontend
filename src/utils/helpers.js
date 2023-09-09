import Swal from 'sweetalert2'

const Reminder = Swal.mixin({
  position: 'top-end',
  showConfirmButton: false,
  timerProgressBar: true,
  timer: 3000,
  customClass: {
    container: 'my-swal',
  },
})

const formErrReminder = fields => {
  const errMsgs = []
  Object.keys(fields).forEach(key => {
    const value = fields[key][0].message
    errMsgs.push(value)
  })
  Reminder.fire({
    icon: 'warning',
    title: errMsgs[0] || '發生未知錯誤，請稍後再試！',
  })
}

export { Reminder, formErrReminder }
