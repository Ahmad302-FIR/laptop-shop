import { shopContact } from '../data/branches';

export const WHATSAPP_NUMBER = "923189299154";

/**
 * Sanitizes and normalizes phone numbers to standard WhatsApp format:
 * - Full country code 92 without '+'
 * - No leading '0'
 * - No spaces, dashes, parentheses or non-digits
 * 
 * Example: '03189299154' -> '923189299154'
 * Example: '+92 318 9299154' -> '923189299154'
 * Example: '923189299154' -> '923189299154'
 * 
 * @param {string|number} [rawNumber]
 * @returns {string} Cleaned digits-only phone number ready for wa.me URL
 */
export const formatWhatsAppNumber = (rawNumber) => {
  if (!rawNumber) return WHATSAPP_NUMBER;
  let cleaned = String(rawNumber).replace(/[^0-9]/g, '');

  if (cleaned.startsWith('0092')) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith('03')) {
    cleaned = '92' + cleaned.slice(1);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = '92' + cleaned.slice(1);
  } else if (cleaned.startsWith('3') && cleaned.length === 10) {
    cleaned = '92' + cleaned;
  }

  return cleaned || WHATSAPP_NUMBER;
};

/**
 * Generates a direct WhatsApp link with a prefilled message for a product
 * @param {string} productName - Name of the product
 * @param {string} [number] - WhatsApp phone number
 * @param {object} [extra] - Optional extra metadata like price or condition
 * @returns {string} Formatted WhatsApp URL e.g. https://wa.me/923189299154?text=...
 */
export const getWhatsAppLink = (
  productName,
  number = WHATSAPP_NUMBER,
  extra = {}
) => {
  const formattedNumber = formatWhatsAppNumber(number);
  let message = `Assalam o Alaikum, I am interested in ${productName}`;
  if (extra.price) {
    message += ` (Price: Rs. ${Number(extra.price).toLocaleString('en-PK')})`;
  }
  if (extra.condition) {
    message += ` [Condition: ${extra.condition}]`;
  }
  message += `. Is this available in stock? Please share more details and photos.`;

  return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
};

/**
 * Generates a general WhatsApp inquiry link
 * @param {string} [customText] - Optional custom message
 * @param {string} [number] - Target number
 * @returns {string} Formatted WhatsApp URL
 */
export const getGeneralWhatsAppLink = (
  customText = "Assalam o Alaikum, I am contacting you from your website. I want to inquire about laptop models in stock.",
  number = WHATSAPP_NUMBER
) => {
  const formattedNumber = formatWhatsAppNumber(number);
  return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(customText)}`;
};
