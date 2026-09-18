<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index() {
        return Inertia::render('Admin/Gallery/Index', ['galleries' => Gallery::latest()->paginate(10)]);
    }

    public function create() {
        return Inertia::render('Admin/Gallery/Form');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:191',
            'description' => 'nullable|string|max:191',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        $validated['image'] = $request->file('image')->store('galleries', 'public');
        Gallery::create($validated);
        return redirect('/admin/galleries')->with('success', 'Gallery berhasil ditambahkan!');
    }

    public function edit(Gallery $gallery) {
        return Inertia::render('Admin/Gallery/Form', ['gallery' => $gallery]);
    }

    public function update(Request $request, Gallery $gallery) {
        $validated = $request->validate([
            'title' => 'required|string|max:191',
            'description' => 'nullable|string|max:191',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        if ($request->hasFile('image')) {
            if ($gallery->image) Storage::disk('public')->delete($gallery->image);
            $validated['image'] = $request->file('image')->store('galleries', 'public');
        }
        $gallery->update($validated);
        return redirect('/admin/galleries')->with('success', 'Gallery berhasil diperbarui!');
    }

    public function destroy(Gallery $gallery) {
        if ($gallery->image) Storage::disk('public')->delete($gallery->image);
        $gallery->delete();
        return redirect('/admin/galleries')->with('success', 'Gallery berhasil dihapus!');
    }
}
