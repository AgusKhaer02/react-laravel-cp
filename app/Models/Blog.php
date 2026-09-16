<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use SoftDeletes;

    protected $table = 'blog';
    protected $guarded = ['id'];

    // Relasi ke Model User
    public function author()
    {
        // Parameter kedua adalah foreign key (author_id), parameter ketiga adalah owner key di tabel users (id)
        return $this->belongsTo(User::class, 'author_id', 'id');
    }
}
