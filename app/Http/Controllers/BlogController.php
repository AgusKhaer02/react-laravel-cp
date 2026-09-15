<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{

    public function index() {
        $data = [
            "title" => "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            "description" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias rem perferendis sint facilis rerum, numquam nam quam consequatur temporibus itaque?",
        ];
        return Inertia::render('Blog', compact('data'));
    }
}
