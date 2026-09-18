import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    // Mengambil flash message dan data auth dari middleware HandleInertiaRequests
    const { flash, auth } = usePage().props;

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            {/* Sidebar (Sama seperti sebelumnya) */}
            <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
                <h4 className="mb-4 text-center border-bottom pb-2 mt-2">
                    <i className="fa-solid fa-shield-halved me-2"></i> Admin Panel
                </h4>
                <ul className="nav nav-pills flex-column mb-auto mt-3">
                   <li className="nav-item mb-2">
                        <Link href={route('admin.dashboard')} className={`nav-link ${route().current('admin.dashboard') ? 'active bg-primary' : 'text-white'}`}>
                            <i className="fa-solid fa-gauge fa-fw me-2"></i> Dashboard
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link href="/admin/about-us" className={`nav-link ${route().current('admin.about-us.*') ? 'active bg-primary' : 'text-white'}`}>
                            <i className="fa-solid fa-building fa-fw me-2"></i> About Us
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link href="/admin/carousels" className={`nav-link ${route().current('admin.carousels.*') ? 'active bg-primary' : 'text-white'}`}>
                            <i className="fa-solid fa-images fa-fw me-2"></i> Carousel
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link href="/admin/services" className={`nav-link ${route().current('admin.services.*') ? 'active bg-primary' : 'text-white'}`}>
                            <i className="fa-solid fa-cogs fa-fw me-2"></i> Services
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link href="/admin/galleries" className={`nav-link ${route().current('admin.galleries.*') ? 'active bg-primary' : 'text-white'}`}>
                            <i className="fa-solid fa-photo-film fa-fw me-2"></i> Gallery
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link href="/admin/company-trusts" className={`nav-link ${route().current('admin.company-trusts.*') ? 'active bg-primary' : 'text-white'}`}>
                            <i className="fa-solid fa-handshake fa-fw me-2"></i> Company Trust
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link href="/admin/testimonials" className={`nav-link ${route().current('admin.testimonials.*') ? 'active bg-primary' : 'text-white'}`}>
                            <i className="fa-solid fa-comments fa-fw me-2"></i> Testimonial
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link href={route('admin.blogs.index')} className={`nav-link ${route().current('admin.blogs.*') ? 'active bg-primary' : 'text-white'}`}>
                            <i className="fa-solid fa-newspaper fa-fw me-2"></i> Blogs
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 bg-light">
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h5 fw-bold text-secondary">CMS Management</span>

                        <div className="d-flex align-items-center">
                            <span className="me-3 fw-semibold text-muted">
                                <i className="fa-solid fa-user-circle fs-5 me-2 align-middle"></i>
                                {auth?.user?.name || 'Administrator'}
                            </span>
                            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm fw-bold">
                                <i className="fa-solid fa-power-off me-1"></i> Logout
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Content Area */}
                <div className="p-4">
                    {/* Flash Message */}
                    {flash?.success && (
                        <div className="alert alert-success alert-dismissible fade show border-0 shadow-sm" role="alert">
                            <i className="fa-solid fa-circle-check me-2"></i> {flash.success}
                            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                        </div>
                    )}

                    {children}
                </div>
            </div>
        </div>
    );
}
