import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ blogs }) {
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(route('admin.blogs.destroy', id));
            // router.delete('/admin/');
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0"><i className="fa-solid fa-list me-2"></i>Daftar Blog</h2>
                <Link href={route('admin.blogs.create')} className="btn btn-primary">
                    <i className="fa-solid fa-plus me-1"></i> Tambah Blog
                </Link>

                <Link href={route('admin.blog.trash')} className="btn btn-outline-danger">
                    <i className="fa-solid fa-trash-can me-1"></i> Tempat Sampah
                </Link>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped mb-0 text-center align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th width="5%">No</th>
                                    <th width="15%">Gambar</th>
                                    <th width="25%">Judul</th>
                                    <th width="20%">Penulis</th>
                                    <th width="20%">Tgl Dibuat</th>
                                    <th width="15%">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.data.map((blog, index) => (
                                    <tr key={blog.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img src={`/storage/${blog.image}`} alt={blog.title} className="img-thumbnail" style={{ height: '60px', objectFit: 'cover' }} />
                                        </td>
                                        <td className="text-start">{blog.title}</td>
                                        <td>{blog.author?.name || 'Admin'}</td>
                                        <td>{new Date(blog.created_at).toLocaleDateString('id-ID')}</td>
                                        <td>
                                            <Link href={route('admin.blogs.edit', blog.id)} className="btn btn-sm btn-warning me-2 text-white">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            <button onClick={() => handleDelete(blog.id)} className="btn btn-sm btn-danger">
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {blogs.data.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-muted">Belum ada data blog.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Di sini Anda bisa tambahkan komponen Pagination bawaan Bootstrap jika perlu */}
        </AdminLayout>
    );
}
