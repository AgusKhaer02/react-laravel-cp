import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Trash({ blogs }) {
    const handleRestore = (id) => {
        if (confirm('Apakah Anda yakin ingin mengembalikan data ini?')) {
            router.post(route('admin.blog.restore', id));
        }
    };

    // Tambahkan fungsi baru ini untuk Hapus Permanen
    const handleForceDelete = (id) => {
        if (confirm('PERINGATAN: Data ini akan dihapus secara permanen beserta gambarnya dan tidak dapat dikembalikan. Lanjutkan?')) {
            router.delete(route('admin.blog.force.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0 text-danger">
                    <i className="fa-solid fa-trash-arrow-up me-2"></i> Tempat Sampah Blog
                </h2>
                <Link href={`route('admin.blogs')`} className="btn btn-secondary">
                    <i className="fa-solid fa-arrow-left me-1"></i> Kembali ke Blog
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
                                    <th width="15%">Penulis</th>
                                    <th width="15%">Dihapus Pada</th>
                                    <th width="25%">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.data.map((blog, index) => (
                                    <tr key={blog.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={`/storage/${blog.image}`}
                                                alt={blog.title}
                                                className="img-thumbnail"
                                                style={{ height: '50px', objectFit: 'cover' }}
                                            />
                                        </td>
                                        <td className="text-start text-muted"><s>{blog.title}</s></td>
                                        <td>{blog.author?.name || 'Admin'}</td>
                                        <td className="text-danger">
                                            {new Date(blog.deleted_at).toLocaleDateString('id-ID')}
                                        </td>
                                        <td>
                                            {/* Gabungkan tombol Restore dan Hapus Permanen di sini */}
                                            <div className="d-flex justify-content-center gap-2">
                                                <button
                                                    onClick={() => handleRestore(blog.id)}
                                                    className="btn btn-sm btn-success fw-bold"
                                                    title="Restore Data"
                                                >
                                                    <i className="fa-solid fa-rotate-left me-1"></i> Restore
                                                </button>
                                                <button
                                                    onClick={() => handleForceDelete(blog.id)}
                                                    className="btn btn-sm btn-danger fw-bold"
                                                    title="Hapus Permanen"
                                                >
                                                    <i className="fa-solid fa-fire me-1"></i> Hapus Permanen
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {blogs.data.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-muted">
                                            <i className="fa-solid fa-box-open fs-3 d-block mb-2 text-light"></i>
                                            Tempat sampah kosong.
                                        </td>
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
