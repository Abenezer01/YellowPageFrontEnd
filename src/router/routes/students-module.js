export default [
  {
    path: '/students',
    name: 'students',
    component: () => import('@/views/students-module/students/index.vue'),
  },
  {
    path: '/students/create',
    name: 'add-student',
    meta:{
      navActiveLink:'students',
    },
    component: () => import('@/views/students-module/students/add.vue'),
  }
]
