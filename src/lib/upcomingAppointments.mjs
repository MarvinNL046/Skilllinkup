export function upcomingAppointments(visits, now = Date.now()) {
  return visits
    .filter(({ appointment }) => ["requested", "confirmed"].includes(appointment.status) && (!appointment.scheduledStart || appointment.scheduledStart >= now))
    .sort((a, b) => (a.appointment.scheduledStart || Infinity) - (b.appointment.scheduledStart || Infinity));
}
