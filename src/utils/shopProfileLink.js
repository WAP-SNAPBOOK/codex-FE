const SHOP_PROFILE_LINK_BASE_URL = 'https://snapbook.store/s/';

export const getShopIdentifierCode = (shopLink) => {
  if (!shopLink) return null;

  if (shopLink.slug) return shopLink.slug;
  if (shopLink.publicCode) return shopLink.publicCode;

  const linkUrl = shopLink.canonicalUrl || shopLink.fullUrl;
  const [, code] = String(linkUrl || '').match(/\/s\/([^/?#]+)/) || [];
  return code || null;
};

export const getShopProfileLink = (shopLink) => {
  const code = getShopIdentifierCode(shopLink);
  return code ? `${SHOP_PROFILE_LINK_BASE_URL}${encodeURIComponent(code)}` : null;
};
