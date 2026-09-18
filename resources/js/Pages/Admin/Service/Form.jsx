import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Form({ service }) {
    const isUpdate = !!service;
    const { data, setData, post, put, processing } = useForm({
        name: service?.name || '',
        icon: service?.icon || '',
        title: service?.title || '',
        description: service?.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isUpdate) put(`/admin/services/${service.id}`);
        else post('/admin/services');
    };

    return (
        <AdminLayout>
            <div className="mb-4">
                <Link href="/admin/services" className="btn btn-secondary me-3">Kembali</Link>
                <span className="h4 fw-bold">{isUpdate ? 'Edit Layanan' : 'Tambah Layanan'}</span>
            </div>
            <form onSubmit={submit} className="card p-4 shadow-sm border-0">
                <input type="text" className="form-control mb-3" placeholder="Nama Layanan" value={data.name} onChange={e => setData('name', e.target.value)} required />
                <input type="text" className="form-control mb-3" placeholder="Class Icon FontAwesome (cth: fa-laptop)" value={data.icon} onChange={e => setData('icon', e.target.value)} required />
                <input type="text" className="form-control mb-3" placeholder="Judul" value={data.title} onChange={e => setData('title', e.target.value)} required />
                <textarea className="form-control mb-3" placeholder="Deskripsi" rows="3" value={data.description} onChange={e => setData('description', e.target.value)} required></textarea>
                <button type="submit" className="btn btn-primary" disabled={processing}>Simpan</button>
            </form>
        </AdminLayout>
    );
}
