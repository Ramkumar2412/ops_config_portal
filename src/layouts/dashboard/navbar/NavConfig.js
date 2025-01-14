// components
import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  blog: getIcon('ic_blog'),
};

const navConfig = [
  {
    items: [
      {
        title: 'Gateway',
        path: '/dashboard/config',
        icon: ICONS.blog,
      },
    ],
  },  
];

export default navConfig;
