const getFirstDefined = (...values) =>
  values.find((value) => value !== undefined && value !== null);

export const formatPrice = (price, fallback = '가격 미정') => {
  const numericPrice = Number(price);

  if (price === null || price === undefined || !Number.isFinite(numericPrice)) {
    return fallback;
  }

  return `${numericPrice.toLocaleString('ko-KR')}원`;
};

export const getReservationTotalPrice = (reservation = {}) => {
  const explicitTotal = getFirstDefined(
    reservation.totalPrice,
    reservation.totalAmount,
    reservation.totalCost,
    reservation.amount
  );

  if (
    explicitTotal !== undefined &&
    explicitTotal !== null &&
    Number.isFinite(Number(explicitTotal))
  ) {
    return {
      price: Number(explicitTotal),
      missingText: '',
    };
  }

  const menus = Array.isArray(reservation.menus) ? reservation.menus : [];
  const prices = menus
    .map((menu) => getFirstDefined(menu.priceSnapshot, menu.price))
    .filter((price) => price !== null && price !== undefined && Number.isFinite(Number(price)));

  if (prices.length === 0) {
    return {
      price: null,
      missingText: menus.length ? '메뉴 가격 미정' : '',
    };
  }

  return {
    price: prices.reduce((sum, price) => sum + Number(price), 0),
    missingText: prices.length < menus.length ? '일부 메뉴 가격 미정' : '',
  };
};

export const formatReservationTotalPrice = (reservation = {}) => {
  const total = getReservationTotalPrice(reservation);

  return {
    text: total.price === null ? '총액 미정' : formatPrice(total.price, '총액 미정'),
    missingText: total.missingText,
  };
};
