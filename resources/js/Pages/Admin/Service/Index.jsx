import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ services }) {
    const handleDelete = (id) => {
        if (confirm('Hapus layanan ini?')) router.delete(`/admin/services/${id}`);
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between mb-4">
                <h2 className="h4 mb-0"><i className="fa-solid fa-cogs me-2"></i>Daftar Layanan</h2>
                <Link href="/admin/services/create" className="btn btn-primary"><i className="fa-solid fa-plus"></i> Tambah</Link>
            </div>
            <table className="table table-striped text-center align-middle bg-white shadow-sm">
                <thead className="table-dark">
                    <tr><th>No</th><th>Ikon (Class)</th><th>Nama</th><th>Judul</th><th>Aksi</th></tr>
                </thead>
                <tbody>
                    {services.data.map((item, i) => (
                        <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td><i className={`fa-solid ${item.icon} fs-4`}></i> ({item.icon})</td>
                            <td>{item.name}</td>
                            <td>{item.title}</td>
                            <td>
                                <Link href={`/admin/services/${item.id}/edit`} className="btn btn-sm btn-warning me-2"><i className="fa-solid fa-pen"></i></Link>
                                <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger"><i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
}
