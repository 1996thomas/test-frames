import { STRAPI_URL } from '../config';
import { createCanvas } from 'canvas';

export const createTextAndImageOverlay = async (text: String) => {
  const url = `${STRAPI_URL}/api/tests`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('failed to fetch some resource');
    }
    const data = await response.json();
    const textTest = data[0].attributes.name;
    const canvas = createCanvas(250, 250);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#7d7d7d';
    ctx.font = '48px Arial';
    ctx.fillText(textTest, 10, 180);
    return { textTest };
  } catch (error) {
    return { textTest: error };
  }
};
