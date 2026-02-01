// Showcase ticker thumbnails config
export const TICKERS = [
  {
    id: 1,
    url: 'https://www.example.com/ticker1',
    img: 'https://img.youtube.com/vi/dQw4w9WgXcQ/1.jpg',
    title: 'Dummy Ticker 1',
  },
  {
    id: 2,
    url: 'https://www.example.com/ticker2',
    img: 'https://img.youtube.com/vi/dQw4w9WgXcQ/2.jpg',
    title: 'Dummy Ticker 2',
  },
  {
    id: 3,
    url: 'https://www.example.com/ticker3',
    img: 'https://img.youtube.com/vi/dQw4w9WgXcQ/3.jpg',
    title: 'Dummy Ticker 3',
  },
  {
    id: 4,
    url: 'https://www.example.com/ticker4',
    img: 'https://img.youtube.com/vi/dQw4w9WgXcQ/4.jpg',
    title: 'Dummy Ticker 4',
  },
  {
    id: 5,
    url: 'https://www.example.com/ticker5',
    img: 'https://img.youtube.com/vi/dQw4w9WgXcQ/5.jpg',
    title: 'Dummy Ticker 5',
  },
  {
    id: 6,
    url: 'https://www.example.com/ticker6',
    img: 'https://img.youtube.com/vi/dQw4w9WgXcQ/6.jpg',
    title: 'Dummy Ticker 6',
  },
  {
    id: 7,
    url: 'https://www.example.com/ticker7',
    img: 'https://img.youtube.com/vi/dQw4w9WgXcQ/7.jpg',
    title: 'Dummy Ticker 7',
  },
  {
    id: 8,
    url: 'https://www.example.com/ticker8',
    img: 'https://img.youtube.com/vi/dQw4w9WgXcQ/8.jpg',
    title: 'Dummy Ticker 8',
  },
];

// Configuration for contact details
export const CONTACT = {
  SMS_NUMBER: "+1-669-388-1453",
  EMAIL: "contact@nristories.com"
};

// JumpIn form submission endpoint (Google Apps Script / spreadsheet backend)
// Change this to point to your deployed script URL.
export const JUMPIN_SUBMIT_URL = "https://script.google.com/macros/s/AKfycbyzuobWQ3GsPOkqObvOGlZFfFJHcruQoQzPidovWn11J_KsHxDkS-JWuzvmr3a1CH8a/exec";
//export const JUMPIN_SUBMIT_URL = "https://script.google.com/macros/s/AKfycbyzuobWQ3GsPOkqObvOGlZFfFJHcruQoQzPidovWn11J_KsHxDkS-JWuzvmr3a1CH8a/exec";

// Social media links for use in footer, banners, etc.
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/nristoriess",
  twitter: "https://twitter.com/nristoriess",
  instagram: "https://instagram.com/nristoriess",
  youtube: "https://youtube.com/@nristoriess",
  linkedin: "https://linkedin.com/company/nristoriess",
  tiktok: "https://tiktok.com/@nristoriess"
};

// Stripe Payment Links for donations (configure in Stripe Dashboard).
// Map amounts to their corresponding Payment Link URLs.
// test: 'https://buy.stripe.com/test_8x24gr1VneIAeIH19Fco000'
export const DONATE_LINKS = {
  5: "https://donate.stripe.com/14A6oz79JeN1deCaT893y00",
  11: "https://donate.stripe.com/4gM5kv51BgV9fmK4uK93y01",
  21: "https://donate.stripe.com/cNi5kv79J6gv1vU8L093y02",
  51: "https://donate.stripe.com/7sYcMXalV6gv2zYbXc93y03",
  101: "https://donate.stripe.com/14A4gr0LlbAPcayaT893y04",
  Custom: "https://donate.stripe.com/9B63cn65F7kz0rQ4uK93y05"

};

// PayPal donation links (configure to your PayPal.me or hosted donation buttons)
// Example for PayPal.me: 'https://paypal.me/yourname/5' (amount at the end)
export const DONATE_PAYPAL_LINKS = {
  5: "",
  10: "",
  20: "",
  50: "",
  100: ""
};
