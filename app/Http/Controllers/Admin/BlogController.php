<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('author')->latest()->paginate(10);
        return Inertia::render('Admin/Blog/Index', compact('blogs'));
    }

    public function create()
    {
        return Inertia::render('Admin/Blog/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:191',
            'subtitle' => 'required|string|max:191',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'content' => 'required|string',
        ]);

        // Upload image
        // $imagePath = $request->file('image')->store('blogs', 'public');
        $imagePath = Storage::disk('public')->putFile('blogs', $request->file('image'));

        Blog::create([
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'],
            'image' => $imagePath,
            'content' => $validated['content'],
            'author_id' => auth()->id(), // Otomatis mengisi author_id dari user yang login
        ]);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog berhasil ditambahkan!');
    }

    public function edit(Blog $blog)
    {
        return Inertia::render('Admin/Blog/Form', compact('blog'));
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:191',
            'subtitle' => 'required|string|max:191',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'content' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            // Hapus gambar lama
            if ($blog->image) Storage::disk('public')->delete($blog->image);
            $validated['image'] = $request->file('image')->store('blogs', 'public');
        } else {
            $validated['image'] = $blog->image;
        }

        $blog->update($validated);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog berhasil diperbarui!');
    }

    public function destroy(Blog $blog)
    {
        // Hapus gambar dari storage (opsional jika menggunakan soft deletes)
        // if ($blog->image) Storage::disk('public')->delete($blog->image);

        $blog->delete();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog berhasil dihapus!');
    }


    public function trash()
    {
        $trashedBlogs = Blog::onlyTrashed()->with('author')->latest()->paginate(10);

        return Inertia::render('Admin/Blog/Trash', [
            'blogs' => $trashedBlogs
        ]);
    }

    public function restore($id)
    {
        $trashedBlogs = Blog::onlyTrashed()->findOrFail($id);

        $trashedBlogs->restore();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog berhasil dihapus kembalikan!');
    }

    public function forceDestroy($id) {
        $blog = Blog::onlyTrashed()->findOrFail($id);
        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }

        // delete blog permanen
        $blog->forceDelete();

        return redirect()->route('admin.blog.trash')->with('success', 'Data blog dan gambar berhasil dihapus permanen!');
    }
}
