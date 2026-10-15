/**
 * Hindi wording for the messages the forms display: the API's confirmations
 * and validation errors, and the network fallbacks in services/api.js.
 *
 * The server keeps sending English; this only changes what is shown. A message
 * not listed here is displayed exactly as received.
 */

const EXACT = {
  'Application received. Our admission team will call you shortly.':
    'आवेदन प्राप्त हो गया है। हमारी प्रवेश टीम जल्द ही आपको कॉल करेगी।',
  'Thank you — your message has been sent. We will get back to you soon.':
    'धन्यवाद — आपका संदेश भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।',
  'Please correct the highlighted fields.': 'कृपया लाल रंग से चिह्नित फ़ील्ड ठीक करें।',
  'Too many submissions. Please try again after some time.':
    'बहुत अधिक बार फ़ॉर्म भेजा गया है। कृपया कुछ समय बाद फिर से कोशिश करें।',
  'Something went wrong. Please try again.': 'कुछ गड़बड़ हो गई। कृपया फिर से कोशिश करें।',
  'Could not reach the server. Check your connection and try again.':
    'सर्वर से संपर्क नहीं हो सका। अपना इंटरनेट कनेक्शन जाँचें और फिर से कोशिश करें।',
  'Enter a valid 10-digit mobile number.': 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।',
  'Enter a valid email address.': 'कृपया सही ईमेल पता दर्ज करें।',
  'Enter a valid date of birth.': 'कृपया सही जन्म तिथि दर्ज करें।',
  'Applicant must be at least 14 years old.': 'आवेदक की आयु कम से कम 14 वर्ष होनी चाहिए।',
  'Percentage must be between 0 and 100.': 'प्रतिशत 0 से 100 के बीच होना चाहिए।',
};

/** Field messages the server builds from the field's label, e.g. "Full name is required." */
const PATTERNS = [
  [/^(.+) is required\.$/, (label) => `${label} भरना ज़रूरी है।`],
  [/^(.+) must be at least (\d+) characters\.$/, (label, n) => `${label} में कम से कम ${n} अक्षर होने चाहिए।`],
  [/^(.+) must be at most (\d+) characters\.$/, (label, n) => `${label} में अधिकतम ${n} अक्षर हो सकते हैं।`],
  [/^Select a valid .+\.$/, () => 'कृपया सूची में से एक सही विकल्प चुनें।'],
];

export function inHindi(message) {
  if (!message) return message;
  if (EXACT[message]) return EXACT[message];
  for (const [pattern, toHindi] of PATTERNS) {
    const match = message.match(pattern);
    if (match) return toHindi(...match.slice(1));
  }
  return message;
}

export default inHindi;
