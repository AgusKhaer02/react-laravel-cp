<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_blogs' => Blog::count(),
        ];
        return Inertia::render('Admin/Dashboard/Index', compact('stats'));
    }
}
