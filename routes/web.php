<?php

use App\Http\Controllers\Admin\AboutUsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\CarouselController;
use App\Http\Controllers\Admin\CompanyTrustController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Guest\HomeController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return redirect()->route('admin.dashboard');
// });
Route::get('/', [HomeController::class, 'index'])->name('index');
Route::middleware('guest')->group(function () {

    Route::get('login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('login', [AuthController::class, 'login']);
});

Route::middleware('auth')->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');


        Route::get('blogs/trash', [BlogController::class, 'trash'])->name('blog.trash');
        Route::post('blogs/{id}/restore', [BlogController::class, 'restore'])->name('blog.restore');
        Route::delete('blogs/{id}/force', [BlogController::class, 'forceDestroy'])->name('blog.force.destroy');
        Route::resource('blogs', BlogController::class);

        Route::resource('galleries', GalleryController::class);
        Route::resource('company-trusts', CompanyTrustController::class);
        Route::resource('carousels', CarouselController::class);
        Route::resource('services', ServiceController::class);
        Route::resource('testimonials', TestimonialController::class);

        // About Us (Hanya Edit Data Pertama)
        Route::get('about-us', [AboutUsController::class, 'edit']);
        // Menggunakan POST karena ada upload file (dibantu _method: PUT di frontend)
        Route::post('about-us', [AboutUsController::class, 'update']);
    });
});
