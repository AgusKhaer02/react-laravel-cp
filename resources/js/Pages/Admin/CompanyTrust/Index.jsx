import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ companyTrusts }) {
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus logo ini?')) {
            router.delete(`/admin/company-trusts/${id}`);
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0"><i className="fa-solid fa-handshake me-2"></i>Daftar Company Trust</h2>
                <Link href="/admin/company-trusts/create" className="btn btn-primary">
                    <i className="fa-solid fa-plus me-1"></i> Tambah Partner
                </Link>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped mb-0 text-center align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th width="5%">No</th>
                                    <th width="25%">Logo Partner</th>
                                    <th width="50%">Link URL</th>
                                    <th width="20%">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companyTrusts.data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt="Partner Logo"
                                                className="img-thumbnail"
                                                style={{ height: '60px', objectFit: 'contain' }}
                                            />
                                        </td>
                                        <td className="text-start">
                                            {item.linkUrl ? (
                                                <a href={item.linkUrl} target="_blank" rel="noreferrer">{item.linkUrl}</a>
                                            ) : (
                                                <span className="text-muted">Tidak ada link</span>
                                            )}
                                        </td>
                                        <td>
                                            <Link href={`/admin/company-trusts/${item.id}/edit`} className="btn btn-sm btn-warning me-2 text-white">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger">
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {companyTrusts.data.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4 text-muted">Belum ada data partner.</td>
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
