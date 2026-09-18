import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ testimonials }) {
    const handleDelete = (id) => {
        if (confirm('Hapus testimoni ini?')) router.delete(`/admin/testimonials/${id}`);
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between mb-4">
                <h2 className="h4 mb-0"><i className="fa-solid fa-comments me-2"></i>Testimoni</h2>
                <Link href="/admin/testimonials/create" className="btn btn-primary"><i className="fa-solid fa-plus"></i> Tambah</Link>
            </div>
            <table className="table table-striped text-center align-middle bg-white shadow-sm">
                <thead className="table-dark">
                    <tr><th>No</th><th>Foto</th><th>Nama</th><th>Jabatan</th><th>Aksi</th></tr>
                </thead>
                <tbody>
                    {testimonials.data.map((item, i) => (
                        <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td>{item.image ? <img src={`/storage/${item.image}`} height="50" className="rounded-circle" alt="User" /> : '-'}</td>
                            <td>{item.personName}</td>
                            <td>{item.jobTitle}</td>
                            <td>
                                <Link href={`/admin/testimonials/${item.id}/edit`} className="btn btn-sm btn-warning me-2"><i className="fa-solid fa-pen"></i></Link>
                                <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger"><i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
}
