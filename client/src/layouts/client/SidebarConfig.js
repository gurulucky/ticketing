// routes
import { PATH_CLIENT } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Dashboard',
    items: [
      {
        title: 'Dashboard',
        path: PATH_CLIENT.dashboard,
        icon: ICONS.dashboard
      },
      { title: 'Event', path: PATH_CLIENT.events, icon: <EventNoteIcon /> },
      { title: 'Order List', path: PATH_CLIENT.orderlist, icon: ICONS.cart },
      { title: 'Customer List', path: PATH_CLIENT.customerlist, icon: <AccountBoxIcon/> }
    ]
  }
];

export default sidebarConfig;
