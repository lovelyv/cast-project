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
export const JUMPIN_SUBMIT_URL = "https://script.google.com/macros/s/AKfycbwc16-4NenkpXlbHHvlmo_jedI4r0DkqqBi3IpzeRsLOfvjjHcQYslILlwZfcc2KCSD/exec";
//export const JUMPIN_SUBMIT_URL = "https://script.google.com/macros/s/AKfycbyzuobWQ3GsPOkqObvOGlZFfFJHcruQoQzPidovWn11J_KsHxDkS-JWuzvmr3a1CH8a/exec";

// Social media links for use in footer, banners, etc.
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/nristories",
  twitter: "https://twitter.com/nristories",
  instagram: "https://instagram.com/nristories",
  youtube: "https://youtube.com/@nristories",
  linkedin: "https://linkedin.com/company/nristories",
  tiktok: "https://tiktok.com/@nristories"
};

// Stripe Payment Links for donations (configure in Stripe Dashboard).
// Map amounts to their corresponding Payment Link URLs.
// Example: 'https://buy.stripe.com/test_XXXXXXXXXXXX'
export const DONATE_LINKS = {
  5: "https://buy.stripe.com/test_00w14p64o8Bvdjs5A818c00",
  10: "",
  20: "",
  50: "",
  100: ""
};
