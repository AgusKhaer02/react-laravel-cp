import { createInertiaApp } from '@inertiajs/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
createInertiaApp({
    strictMode: true,
    pages: {
        path: './Pages',
        extension: '.jsx',
        lazy: true,
    },
})
