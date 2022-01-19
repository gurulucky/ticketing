// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_CLIENT = '/client';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  home: '/',
  event: '/event',
  venue: '/venue',
  profile:'/user'
};

export const PATH_CLIENT = {
  root: ROOTS_CLIENT,
  dashboard:path(ROOTS_CLIENT, '/dashboard'),
  events: path(ROOTS_CLIENT, '/events'),
  eventdetail: path(ROOTS_CLIENT, '/detail'),
  customerlist: path(ROOTS_CLIENT, '/customer'),
  orderlist: path(ROOTS_CLIENT, '/orders'),
};

export const PATH_DASHBOARD = {

}

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
