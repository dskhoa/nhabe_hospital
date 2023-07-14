import {
  HomeIcon,
  UserIcon,
  DocumentReportIcon
} from '@heroicons/vue/outline'

const Login = () => import('modules/auth/views/login.vue')
const Register = () => import('modules/auth/views/register.vue')
const ForgotPassword = () => import('modules/auth/views/forgot-password.vue')
const NotFound = () => import('modules/pages/views/404.vue')
const Dashboard = () => import('modules/dashboard/views/index.vue')
const Profile = () => import('modules/profile/views/index.vue')
const Reports = () => import('modules/reports/views/index.vue')

const CreateReport = () => import('modules/reports/views/components/create-report.vue')


const routes = [
  {
    path: '/',
    component: Reports,
    name: 'Reports',
    meta: {
      requiresAuth: false,
      layout: 'report'
    }
  },
  {
    path: '/create-report',
    component: CreateReport,
    name: 'Create Report',
    meta: {
      requiresAuth: false,
      parentPath: 'Home',
      layout: 'report'
    }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    meta: {
      title: 'Phân tích',
      icon: HomeIcon,
      color: 'text-indigo-410',
      requiresAuth: true,
      parentPath: 'Home'
    },
  },
  {
    path: '/profile',
    component: Profile,
    name: 'Profile',
    meta: {
      title: 'Trang cá nhân',
      icon: UserIcon,
      color: 'text-success-50',
      isDarkBackground: true,
      isFullWidthLayout: true,
      requiresAuth: true,
      parentPath: 'Home'
    },
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    name: 'forgot-password',
    meta: {
      requiresAuth: false,
    },
  },
  {

    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    name: 'NotFound',
    meta: {
      requiresAuth: false,
    },
  },
]

export default routes
