const AdminMenu = [
    {
        heading: 'Main Navigation',
        // translate: 'sidebar.heading.HEADER'
    },
    {
        name: 'Dashboard',
        icon: 'icon-speedometer',
        translate: 'sidebar.nav.DASHBOARD',
        // label: { value: 3, color: 'success' },
        path: '/admindashboard'
        // submenu: [{
        //         name: 'Dashboard v1',
        //         path: '/dashboardv1'
        //     },
        //     {
        //         name: 'Dashboard v2',
        //         path: '/dashboardv2'
        //     },
        //     {
        //         name: 'Dashboard v3',
        //         path: '/dashboardv3'
        //     }
        // ]
    },
    // {
    //     name: 'Widgets',
    //     icon: 'icon-grid',
    //     path: '/widgets',
    //     label: { value: 30, color: 'success' },
    //     translate: 'sidebar.nav.WIDGETS'
    // },
    // {
    //     heading: 'Components',
    //     translate: 'sidebar.heading.COMPONENTS'
    // },
    {
        name: 'Vendors',
        icon: 'fas fa-industry',
        translate: 'sidebar.nav.element.VENDORS',
        submenu: [{
            name: 'Add Vendors',
            path: '/addVendor',
        },
        {
            name: 'Manage Vendors',
            path: '/manageVendor',
        },
        ]
    },
    {
        name: 'Clients',
        icon: 'fas fa-user-clock',
        translate: 'sidebar.nav.element.CLIENTS',
        submenu: [{
            name: 'Add Clients',
            path: '/addClient',
        },
        {
            name: 'Manage Clients',
            path: '/manageClients',
        },
        ]
    },
    {
        name: 'Projects',
        icon: 'fas fa-project-diagram',
        translate: 'sidebar.nav.element.PROJECTS',
        submenu: [{
            name: 'Add Projects',
            path: '/addProject',
        },
        {
            name: 'Manage Projects',
            path: '/manageProjects',
        },
        ]
    },
    {
        name: 'Users',
        icon: 'fas fa-users',
        translate: 'sidebar.nav.element.CONSULTANTS',
        path: '/manageUsers'
    },
    // {
    //     name: 'Users',
    //     icon: 'fas fa-users',
    //     translate: 'sidebar.nav.element.CONSULTANTS',
    //     submenu: [{
    //         name: 'Add Users',
    //         path: '/addConsultant',
    //     },
    //     {
    //         name: 'All Users',
    //         path: '/consultants',
    //     },
    //     // {
    //     //     name: 'Bench Consultants',
    //     //     path: '/consultants',
    //     // },
    //     ]
    // },
    {
        name: 'Settings',
        icon: 'fas fa-users',
        path: '/settings',
        translate: 'sidebar.nav.element.SETTINGS'
    },
    {
        name: 'Timesheets',
        icon: 'far fa-clock',
        path: '/timesheets',
        translate: 'sidebar.nav.element.TIMESHEETS'
    },
    // {
    //     name: 'Sales',
    //     icon: 'far fa-list-alt',
    //     translate: 'sidebar.nav.element.SALES',
    //     submenu: [{
    //         name: 'Add Sales Person',
    //         path: '/sales',
    //     },
    //     {
    //         name: 'Manage Sales Persons',
    //         path: '/sales',
    //     },
    //     {
    //         name: 'Client Submissions',
    //         path: '/sales',
    //     },
    //     {
    //         name: 'Interview Schedules',
    //         path: '/sales',
    //     },
    //     ]
    // },
    // {
    //     name: 'Immigrations',
    //     icon: 'fab fa-cc-visa',
    //     path: '/jobPosting',
    //     translate: 'sidebar.nav.element.JOB POSTINGS'
    // },
    // {
    //     name: 'Accounts',
    //     icon: 'fas fa-money-bill-alt',
    //     path: '/accounts',
    //     translate: 'sidebar.nav.element.Accounts'
    // },
    // {
    //     name: 'Reports',
    //     icon: 'icon-speech',
    //     path: '/reports',
    //     translate: 'sidebar.nav.element.REPORTS'
    // },
    // {
    //     name: 'Tables',
    //     icon: 'icon-grid',
    //     translate: 'sidebar.nav.table.TABLE',
    //     submenu: [{
    //             name: 'Standard',
    //             path: '/table-standard',
    //             translate: 'sidebar.nav.table.STANDARD'
    //         },
    //         {
    //             name: 'Extended',
    //             path: '/table-extended',
    //             translate: 'sidebar.nav.table.EXTENDED'
    //         },
    //         {
    //             name: 'Datatable',
    //             path: '/table-datatable',
    //             translate: 'sidebar.nav.table.DATATABLE'
    //         },
    //         {
    //             name: 'Datagrid',
    //             path: '/table-datagrid',
    //         }
    //     ]
    // },
 
];

export default AdminMenu;