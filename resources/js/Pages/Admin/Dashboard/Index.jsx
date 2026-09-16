import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ stats }) {
    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0"><i className="fa-solid fa-gauge me-2 text-primary"></i> Dashboard Overview</h2>
            </div>

            <div className="row g-4">
                {/* Card Statistik Blog */}
                <div className="col-md-4">
                    <div className="card text-white bg-primary shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
                        <div className="card-body d-flex align-items-center">
                            <div className="fs-1 me-4">
                                <i className="fa-solid fa-newspaper"></i>
                            </div>
                            <div>
                                <h5 className="card-title mb-1">Total Blog</h5>
                                <h2 className="mb-0 fw-bold">{stats.total_blogs}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card Template untuk Modul Lain */}
                <div className="col-md-4">
                    <div className="card text-white bg-success shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
                        <div className="card-body d-flex align-items-center">
                            <div className="fs-1 me-4">
                                <i className="fa-solid fa-handshake"></i>
                            </div>
                            <div>
                                <h5 className="card-title mb-1">Company Trust</h5>
                                <h2 className="mb-0 fw-bold">0</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-white bg-warning shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
                        <div className="card-body d-flex align-items-center">
                            <div className="fs-1 me-4">
                                <i className="fa-solid fa-images"></i>
                            </div>
                            <div>
                                <h5 className="card-title mb-1">Total Gallery</h5>
                                <h2 className="mb-0 fw-bold text-white">0</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 card shadow-sm border-0">
                <div className="card-body">
                    <h5 className="card-title mb-3"><i className="fa-solid fa-bullhorn me-2"></i> Selamat Datang!</h5>
                    <p className="card-text text-muted">
                        Ini adalah panel administrasi CMS Anda. Gunakan menu di sebelah kiri untuk mengelola konten website seperti profil perusahaan, artikel blog, layanan, testimoni, dan galeri.
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
