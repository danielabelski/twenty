import { getURLSafely } from '@/utils/getURLSafely';
import { isDefined } from '@/utils/validation';

export const lowercaseUrlOriginAndRemoveTrailingSlash = (rawUrl: string) => {
  const url = getURLSafely(rawUrl);

  if (!isDefined(url)) {
    return rawUrl;
  }

  const lowercaseOrigin = url.origin.toLowerCase();
  const rawOrigin = rawUrl.match(/^[a-zA-Z][a-zA-Z\d+.-]*:\/\/[^/?#]+/)?.[0];
  const path = isDefined(rawOrigin)
    ? rawUrl.slice(rawOrigin.length)
    : url.pathname + url.search + url.hash;

  return (lowercaseOrigin + path).replace(/\/$/, '');
};
