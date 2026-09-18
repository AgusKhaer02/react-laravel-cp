import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Form({ gallery }) {
    const isUpdate = !!gallery;
    const { data, setData, post, processing, errors } = useForm({
        title: gallery?.title || '',
        description: gallery?.description || '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isUpdate) {
            post(`/admin/galleries/${gallery.id}`, { data: { _method: 'PUT', ...data }, forceFormData: true });
        } else {
            post('/admin/galleries');
        }
    };

    return (
        <AdminLayout>
            <div className="mb-4">
                <Link href="/admin/galleries" className="btn btn-secondary me-3">Kembali</Link>
                <span className="h4 fw-bold">{isUpdate ? 'Edit Gallery' : 'Tambah Gallery'}</span>
            </div>
            <form onSubmit={submit} className="card p-4 shadow-sm border-0">
                <input type="text" className="form-control mb-3" placeholder="Judul" value={data.title} onChange={e => setData('title', e.target.value)} />
                <input type="text" className="form-control mb-3" placeholder="Deskripsi" value={data.description} onChange={e => setData('description', e.target.value)} />
                <input type="file" className="form-control mb-3" onChange={e => setData('image', e.target.files[0])} />
                <button type="submit" className="btn btn-primary" disabled={processing}>Simpan</button>
            </form>
        </AdminLayout>
    );
}
