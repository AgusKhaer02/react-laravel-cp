import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Head title="Login Admin" />
            <div className="card shadow-lg border-0" style={{ width: '400px', borderRadius: '15px' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <div className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3" style={{ width: '60px', height: '60px' }}>
                            <i className="fa-solid fa-lock fs-3"></i>
                        </div>
                        <h4 className="fw-bold">Login Admin</h4>
                        <p className="text-muted">Masuk ke panel manajemen konten</p>
                    </div>

                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Email Address</label>
                            <div className="input-group">
                                <span className="input-group-text bg-white"><i className="fa-solid fa-envelope text-muted"></i></span>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@example.com"
                                    required
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">Password</label>
                            <div className="input-group">
                                <span className="input-group-text bg-white"><i className="fa-solid fa-key text-muted"></i></span>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                        </div>

                        <div className="mb-4 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="rememberMe">Ingat Saya</label>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={processing}>
                            {processing ? (
                                <span><i className="fa-solid fa-spinner fa-spin me-2"></i> Memproses...</span>
                            ) : (
                                <span><i className="fa-solid fa-right-to-bracket me-2"></i> Masuk</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
