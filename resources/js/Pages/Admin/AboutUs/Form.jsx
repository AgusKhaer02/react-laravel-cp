import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Form({ aboutUs }) {
    const { data, setData, post, processing, errors } = useForm({
        companyName: aboutUs?.companyName || '',
        title: aboutUs?.title || '',
        subtitle: aboutUs?.subtitle || '',
        description: aboutUs?.description || '',
        logoCompany: null,
        imageBanner: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/about-us', {
            data: { _method: 'PUT', ...data },
            forceFormData: true
        });
    };

    return (
        <AdminLayout>
            <div className="mb-4">
                <h2 className="h4 mb-0"><i className="fa-solid fa-building me-2"></i> Pengaturan About Us</h2>
            </div>

            <form onSubmit={submit} className="card p-4 shadow-sm border-0" encType="multipart/form-data">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Nama Perusahaan</label>
                        <input type="text" className={`form-control ${errors.companyName ? 'is-invalid' : ''}`} value={data.companyName} onChange={e => setData('companyName', e.target.value)} />
                        {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Judul</label>
                        <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={data.title} onChange={e => setData('title', e.target.value)} />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Subjudul</label>
                    <input type="text" className={`form-control ${errors.subtitle ? 'is-invalid' : ''}`} value={data.subtitle} onChange={e => setData('subtitle', e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Deskripsi</label>
                    <textarea className={`form-control ${errors.description ? 'is-invalid' : ''}`} rows="4" value={data.description} onChange={e => setData('description', e.target.value)}></textarea>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Logo Perusahaan</label>
                        {aboutUs?.logoCompany && <img src={`/storage/${aboutUs.logoCompany}`} className="d-block mb-2 img-thumbnail" style={{height: '60px'}} alt="Logo" />}
                        <input type="file" className="form-control" onChange={e => setData('logoCompany', e.target.files[0])} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Gambar Banner</label>
                        {aboutUs?.imageBanner && <img src={`/storage/${aboutUs.imageBanner}`} className="d-block mb-2 img-thumbnail" style={{height: '60px'}} alt="Banner" />}
                        <input type="file" className="form-control" onChange={e => setData('imageBanner', e.target.files[0])} />
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-primary px-4" disabled={processing}>
                        <i className="fa-solid fa-floppy-disk me-2"></i> Simpan Perubahan
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
