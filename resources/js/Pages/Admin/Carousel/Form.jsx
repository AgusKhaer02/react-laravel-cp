import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Form({ carousel }) {
    const isUpdate = !!carousel;

    const { data, setData, post, processing, errors } = useForm({
        title: carousel?.title || '',
        subtitle: carousel?.subtitle || '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        if (isUpdate) {
            post(`/admin/carousels/${carousel.id}`, {
                data: {
                    _method: 'PUT',
                    ...data
                },
                forceFormData: true
            });
        } else {
            post('/admin/carousels');
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0">
                    <i className={`fa-solid ${isUpdate ? 'fa-pen-to-square' : 'fa-plus'} me-2`}></i>
                    {isUpdate ? 'Edit Carousel' : 'Tambah Carousel'}
                </h2>
                <Link href="/admin/carousels" className="btn btn-secondary">
                    <i className="fa-solid fa-arrow-left me-1"></i> Kembali
                </Link>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label className="form-label fw-bold">Judul Carousel</label>
                            <input
                                type="text"
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Masukkan Judul Utama"
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Subjudul Carousel</label>
                            <input
                                type="text"
                                className={`form-control ${errors.subtitle ? 'is-invalid' : ''}`}
                                value={data.subtitle}
                                onChange={(e) => setData('subtitle', e.target.value)}
                                placeholder="Masukkan Deskripsi Singkat"
                            />
                            {errors.subtitle && <div className="invalid-feedback">{errors.subtitle}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Gambar Carousel</label>
                            {isUpdate && carousel.image && (
                                <div className="mb-2">
                                    <img src={`/storage/${carousel.image}`} alt="Preview" className="img-thumbnail" style={{ height: '150px', objectFit: 'cover' }} />
                                </div>
                            )}
                            <input
                                type="file"
                                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                onChange={(e) => setData('image', e.target.files[0])}
                                accept="image/*"
                            />
                            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                            <small className="text-muted">Gunakan gambar dengan resolusi yang memanjang (landscape) untuk hasil terbaik. Biarkan kosong jika tidak ingin mengubah gambar.</small>
                        </div>

                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary px-4" disabled={processing}>
                                {processing ? (
                                    <span><i className="fa-solid fa-spinner fa-spin me-2"></i> Menyimpan...</span>
                                ) : (
                                    <span><i className="fa-solid fa-floppy-disk me-2"></i> Simpan Data</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
