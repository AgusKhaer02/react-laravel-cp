<?php

namespace Database\Seeders;

use App\Models\AboutUs;
use App\Models\Blog;
use App\Models\Carousel;
use App\Models\CompanyTrust;
use App\Models\Gallery;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       // 1. Seeder untuk User (Admin)
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // Password default: password
        ]);

        // 2. Seeder untuk AboutUs
        AboutUs::create([
            'companyName' => 'PT Teknologi Masa Depan',
            'title' => 'Solusi Digital Terbaik Untuk Anda',
            'subtitle' => 'Membangun Inovasi Tanpa Batas',
            'description' => 'Kami adalah perusahaan yang berfokus pada pengembangan perangkat lunak dan transformasi digital untuk membantu bisnis Anda berkembang.',
            'logoCompany' => 'default/logo.png',
            'imageBanner' => 'default/banner.png',
        ]);

        // 3. Seeder untuk Blog
        Blog::create([
            'title' => 'Mengenal Laravel Inertia ReactJS',
            'subtitle' => 'Tumpukan Teknologi Modern',
            'image' => 'default/blog-1.png',
            'content' => 'Inertia.js memungkinkan Anda membuat aplikasi single-page (SPA) sepenuhnya menggunakan routing dan controller dari framework backend klasik seperti Laravel tanpa perlu membangun API.',
            'author_id' => $admin->id,
        ]);

        // 4. Seeder untuk Carousel
        Carousel::create([
            'image' => 'default/carousel-1.png',
            'title' => 'Selamat Datang di Website Kami',
            'subtitle' => 'Temukan berbagai layanan menarik yang kami tawarkan khusus untuk Anda.',
        ]);

        // 5. Seeder untuk CompanyTrust (Partner/Klien)
        CompanyTrust::create([
            'image' => 'default/partner-1.png',
            'linkUrl' => 'https://example.com',
        ]);

        // 6. Seeder untuk Gallery
        Gallery::create([
            'title' => 'Kegiatan Tahunan Perusahaan',
            'description' => 'Momen kebersamaan tim di acara gathering tahunan.',
            'image' => 'default/gallery-1.png',
        ]);

        // 7. Seeder untuk Service
        Service::create([
            'name' => 'Web Development',
            'icon' => 'fa-laptop-code',
            'title' => 'Pembuatan Website Profesional',
            'description' => 'Layanan pembuatan website responsif, cepat, dan aman menggunakan teknologi terkini.',
        ]);

        // 8. Seeder untuk Testimonial
        Testimonial::create([
            'personName' => 'Budi Santoso',
            'jobTitle' => 'CEO PT Maju Mundur',
            'message' => 'Pelayanan sangat memuaskan, tim profesional dan hasil pengerjaan tepat waktu. Sangat direkomendasikan!',
            'image' => 'default/testimonial-1.png',
        ]);
    }
}
