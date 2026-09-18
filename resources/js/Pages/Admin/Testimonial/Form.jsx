import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Form({ testimonial }) {
    const isUpdate = !!testimonial;
    const { data, setData, post, processing } = useForm({
        personName: testimonial?.personName || '',
        jobTitle: testimonial?.jobTitle || '',
        message: testimonial?.message || '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isUpdate) {
            post(`/admin/testimonials/${testimonial.id}`, { data: { _method: 'PUT', ...data }, forceFormData: true });
        } else {
            post('/admin/testimonials');
        }
    };

    return (
        <AdminLayout>
            <div className="mb-4">
                <Link href="/admin/testimonials" className="btn btn-secondary me-3">Kembali</Link>
                <span className="h4 fw-bold">{isUpdate ? 'Edit Testimoni' : 'Tambah Testimoni'}</span>
            </div>
            <form onSubmit={submit} className="card p-4 shadow-sm border-0">
                <input type="text" className="form-control mb-3" placeholder="Nama Orang" value={data.personName} onChange={e => setData('personName', e.target.value)} required />
                <input type="text" className="form-control mb-3" placeholder="Jabatan" value={data.jobTitle} onChange={e => setData('jobTitle', e.target.value)} required />
                <textarea className="form-control mb-3" placeholder="Pesan / Ulasan" rows="3" value={data.message} onChange={e => setData('message', e.target.value)} required></textarea>

                <label className="form-label fw-bold">Foto Profil (Opsional)</label>
                {testimonial?.image && <img src={`/storage/${testimonial.image}`} className="d-block mb-2 rounded-circle" style={{height: '60px'}} alt="Profile" />}
                <input type="file" className="form-control mb-3" onChange={e => setData('image', e.target.files[0])} />

                <button type="submit" className="btn btn-primary" disabled={processing}>Simpan</button>
            </form>
        </AdminLayout>
    );
}
