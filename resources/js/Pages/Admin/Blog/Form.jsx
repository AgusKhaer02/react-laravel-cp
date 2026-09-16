import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Form({ blog }) {
    const isUpdate = !!blog; // Deteksi apakah mode edit atau create

    const { data, setData, post, put, errors, processing } = useForm({
        title: blog?.title || '',
        subtitle: blog?.subtitle || '',
        content: blog?.content || '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isUpdate) {
            // Karena upload file (multipart/form-data) di Laravel agak tricky menggunakan method PUT secara langsung di Inertia,
            // praktik terbaik adalah menggunakan metode POST dan menambahkan _method: 'PUT' ke data form.
            put(route('admin.blogs.update', blog.id), {
                data: data,
                forceFormData: true
            });
        } else {
            post(route('admin.blogs.store'));
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0">
                    <i className={`fa-solid ${isUpdate ? 'fa-pen-to-square' : 'fa-plus'} me-2`}></i>
                    {isUpdate ? 'Edit Blog' : 'Tambah Blog'}
                </h2>
                <Link href={route('admin.blogs.index')} className="btn btn-secondary">
                    <i className="fa-solid fa-arrow-left me-1"></i> Kembali
                </Link>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label className="form-label fw-bold">Judul</label>
                            <input
                                type="text"
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Masukkan Judul Blog"
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Subjudul</label>
                            <input
                                type="text"
                                className={`form-control ${errors.subtitle ? 'is-invalid' : ''}`}
                                value={data.subtitle}
                                onChange={(e) => setData('subtitle', e.target.value)}
                                placeholder="Masukkan Subjudul"
                            />
                            {errors.subtitle && <div className="invalid-feedback">{errors.subtitle}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Gambar Cover</label>
                            {isUpdate && blog.image && (
                                <div className="mb-2">
                                    <img src={`/storage/${blog.image}`} alt="Preview" className="img-thumbnail" style={{ height: '150px' }} />
                                </div>
                            )}
                            <input
                                type="file"
                                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                onChange={(e) => setData('image', e.target.files[0])}
                                accept="image/*"
                            />
                            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                            <small className="text-muted">Biarkan kosong jika tidak ingin mengubah gambar (untuk Edit).</small>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Konten</label>
                            <textarea
                                className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                                rows="6"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Tuliskan isi blog..."
                            ></textarea>
                            {errors.content && <div className="invalid-feedback">{errors.content}</div>}
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
