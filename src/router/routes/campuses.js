export default [
  {
    path: '/campuses',
    name: 'campuses',

    component: () => import('@/views/campus-module/campuses/index.vue'),
  },
  {
    path: '/campuses/create',
    name: 'add-campus',
    meta:{
      navActiveLink:'campuses',
    },
    component: () => import('@/views/students-module/students/add.vue'),
  }
]
