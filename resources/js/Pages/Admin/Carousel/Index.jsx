import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ carousels }) {
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus carousel ini?')) {
            router.delete(`/admin/carousels/${id}`);
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0"><i className="fa-solid fa-images me-2"></i>Daftar Carousel</h2>
                <Link href="/admin/carousels/create" className="btn btn-primary">
                    <i className="fa-solid fa-plus me-1"></i> Tambah Carousel
                </Link>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped mb-0 text-center align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th width="5%">No</th>
                                    <th width="20%">Gambar</th>
                                    <th width="30%">Judul</th>
                                    <th width="30%">Subjudul</th>
                                    <th width="15%">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carousels.data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.title}
                                                className="img-thumbnail"
                                                style={{ height: '60px', objectFit: 'cover' }}
                                            />
                                        </td>
                                        <td className="text-start">{item.title}</td>
                                        <td className="text-start">{item.subtitle}</td>
                                        <td>
                                            <Link href={`/admin/carousels/${item.id}/edit`} className="btn btn-sm btn-warning me-2 text-white">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger">
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {carousels.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-muted">Belum ada data carousel.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
