const getFirstDefined = (...values) => values.find((value) => value !== undefined && value !== null);

const normalizeMenu = (menu = {}) => ({
  ...menu,
  inputValues: Array.isArray(menu.inputValues) ? menu.inputValues : [],
});

export function normalizeReservationPayload(reservation = {}) {
  const imageUrls = Array.isArray(reservation.imageUrls)
    ? reservation.imageUrls
    : Array.isArray(reservation.photoUrls)
      ? reservation.photoUrls
      : [];

  const imageCount =
    getFirstDefined(reservation.imageCount, reservation.photoCount, imageUrls.length) ?? 0;
  const requirements = getFirstDefined(reservation.requirements, reservation.requests, '');

  return {
    ...reservation,
    imageUrls,
    imageCount,
    requirements,
    menus: Array.isArray(reservation.menus) ? reservation.menus.map(normalizeMenu) : [],
    confirmationMessage: getFirstDefined(reservation.confirmationMessage, reservation.message, null),
    rejectionReason: getFirstDefined(reservation.rejectionReason, reservation.rejectReason, null),
  };
}
