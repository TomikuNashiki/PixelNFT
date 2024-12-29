import { PLACEHOLDER_IMAGES } from './constants';

export const getRandomPlaceholderImage = () => {
  const index = Math.floor(Math.random() * PLACEHOLDER_IMAGES.length);
  return PLACEHOLDER_IMAGES[index];
};

export const validateImageUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};