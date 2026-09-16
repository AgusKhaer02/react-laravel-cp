<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // 1. Table: aboutus
        Schema::create('aboutus', function (Blueprint $table) {
            $table->increments('id');
            $table->string('companyName', 191);
            $table->string('title', 191);
            $table->string('subtitle', 191);
            $table->string('description', 191);
            $table->string('logoCompany', 191);
            $table->string('imageBanner', 191);
            $table->timestamps(); // Menghasilkan created_at dan updated_at otomatis
        });

        // 2. Table: blog
        Schema::create('blog', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 191);
            $table->string('subtitle', 191);
            $table->string('image', 191);
            $table->string('content', 191);

            // Relasi ke tabel users menggunakan foreignId
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes(); // Menghasilkan deleted_at otomatis
        });

        // 3. Table: carousel
        Schema::create('carousel', function (Blueprint $table) {
            $table->increments('id');
            $table->string('image', 191);
            $table->string('title', 191);
            $table->string('subtitle', 191);
            $table->timestamps();
        });

        // 4. Table: companytrust
        Schema::create('companytrust', function (Blueprint $table) {
            $table->increments('id');
            $table->string('image', 191);
            $table->string('linkUrl', 191)->nullable();
            $table->timestamps();
        });

        // 5. Table: gallery
        Schema::create('gallery', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 191);
            $table->string('description', 191)->nullable();
            $table->string('image', 191);
            $table->timestamps();
            $table->softDeletes();
        });

        // 6. Table: service
        Schema::create('service', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 191);
            $table->string('icon', 191);
            $table->string('title', 191);
            $table->string('description', 191);
            $table->timestamps();
            $table->softDeletes();
        });

        // 7. Table: testimonial
        Schema::create('testimonial', function (Blueprint $table) {
            $table->increments('id');
            $table->string('personName', 191);
            $table->string('jobTitle', 191);
            $table->string('message', 191);
            $table->string('image', 191)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('testimonial');
        Schema::dropIfExists('service');
        Schema::dropIfExists('gallery');
        Schema::dropIfExists('companytrust');
        Schema::dropIfExists('carousel');
        Schema::dropIfExists('blog');
        Schema::dropIfExists('aboutus');
    }
};
