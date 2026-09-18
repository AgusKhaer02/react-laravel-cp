import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Form({ companyTrust }) {
    const isUpdate = !!companyTrust;

    const { data, setData, post, processing, errors } = useForm({
        linkUrl: companyTrust?.linkUrl || '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        if (isUpdate) {
            // Override POST menjadi PUT untuk edit yang memiliki upload file
            post(`/admin/company-trusts/${companyTrust.id}`, {
                data: {
                    _method: 'PUT',
                    ...data
                },
                forceFormData: true
            });
        } else {
            post('/admin/company-trusts');
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0">
                    <i className={`fa-solid ${isUpdate ? 'fa-pen-to-square' : 'fa-plus'} me-2`}></i>
                    {isUpdate ? 'Edit Partner' : 'Tambah Partner'}
                </h2>
                <Link href="/admin/company-trusts" className="btn btn-secondary">
                    <i className="fa-solid fa-arrow-left me-1"></i> Kembali
                </Link>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label className="form-label fw-bold">Link URL Website Partner (Opsional)</label>
                            <input
                                type="url"
                                className={`form-control ${errors.linkUrl ? 'is-invalid' : ''}`}
                                value={data.linkUrl}
                                onChange={(e) => setData('linkUrl', e.target.value)}
                                placeholder="Contoh: https://www.google.com"
                            />
                            {errors.linkUrl && <div className="invalid-feedback">{errors.linkUrl}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Logo Partner</label>
                            {isUpdate && companyTrust.image && (
                                <div className="mb-2">
                                    <img src={`/storage/${companyTrust.image}`} alt="Preview" className="img-thumbnail" style={{ height: '100px', objectFit: 'contain' }} />
                                </div>
                            )}
                            <input
                                type="file"
                                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                onChange={(e) => setData('image', e.target.files[0])}
                                accept="image/*"
                            />
                            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                            <small className="text-muted">Upload file gambar (JPG, PNG). Biarkan kosong jika tidak ingin mengubah logo saat edit.</small>
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
