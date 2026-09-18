<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Carousel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CarouselController extends Controller
{
    public function index() {
        return Inertia::render('Admin/Carousel/Index', ['carousels' => Carousel::latest()->paginate(10)]);
    }

    public function create() {
        return Inertia::render('Admin/Carousel/Form');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:191',
            'subtitle' => 'required|string|max:191',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        $validated['image'] = $request->file('image')->store('carousels', 'public');
        Carousel::create($validated);
        return redirect('/admin/carousels')->with('success', 'Carousel berhasil ditambahkan!');
    }

    public function edit(Carousel $carousel) {
        return Inertia::render('Admin/Carousel/Form', ['carousel' => $carousel]);
    }

    public function update(Request $request, Carousel $carousel) {
        $validated = $request->validate([
            'title' => 'required|string|max:191',
            'subtitle' => 'required|string|max:191',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        if ($request->hasFile('image')) {
            if ($carousel->image) Storage::disk('public')->delete($carousel->image);
            $validated['image'] = $request->file('image')->store('carousels', 'public');
        }
        $carousel->update($validated);
        return redirect('/admin/carousels')->with('success', 'Carousel berhasil diperbarui!');
    }

    public function destroy(Carousel $carousel) {
        if ($carousel->image) Storage::disk('public')->delete($carousel->image);
        $carousel->delete();
        return redirect('/admin/carousels')->with('success', 'Carousel berhasil dihapus!');
    }
}
