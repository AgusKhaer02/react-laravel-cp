import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ galleries }) {
    const handleDelete = (id) => {
        if (confirm('Yakin hapus data?')) router.delete(`/admin/galleries/${id}`);
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between mb-4">
                <h2 className="h4 mb-0"><i className="fa-solid fa-images me-2"></i>Gallery</h2>
                <Link href="/admin/galleries/create" className="btn btn-primary"><i className="fa-solid fa-plus"></i> Tambah</Link>
            </div>
            <table className="table table-striped text-center align-middle bg-white shadow-sm">
                <thead className="table-dark">
                    <tr><th>No</th><th>Gambar</th><th>Judul</th><th>Deskripsi</th><th>Aksi</th></tr>
                </thead>
                <tbody>
                    {galleries.data.map((item, i) => (
                        <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td><img src={`/storage/${item.image}`} height="50" alt="img" /></td>
                            <td>{item.title}</td>
                            <td>{item.description || '-'}</td>
                            <td>
                                <Link href={`/admin/galleries/${item.id}/edit`} className="btn btn-sm btn-warning me-2"><i className="fa-solid fa-pen"></i></Link>
                                <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger"><i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
}
