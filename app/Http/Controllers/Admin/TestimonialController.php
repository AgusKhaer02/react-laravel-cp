<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index() {
        return Inertia::render('Admin/Testimonial/Index', ['testimonials' => Testimonial::latest()->paginate(10)]);
    }

    public function create() {
        return Inertia::render('Admin/Testimonial/Form');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'personName' => 'required|string|max:191',
            'jobTitle' => 'required|string|max:191',
            'message' => 'required|string|max:191',
            'image' => 'nullable|image|max:2048',
        ]);
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('testimonials', 'public');
        }
        Testimonial::create($validated);
        return redirect('/admin/testimonials')->with('success', 'Testimoni ditambahkan!');
    }

    public function edit(Testimonial $testimonial) {
        return Inertia::render('Admin/Testimonial/Form', ['testimonial' => $testimonial]);
    }

    public function update(Request $request, Testimonial $testimonial) {
        $validated = $request->validate([
            'personName' => 'required|string|max:191',
            'jobTitle' => 'required|string|max:191',
            'message' => 'required|string|max:191',
            'image' => 'nullable|image|max:2048',
        ]);
        if ($request->hasFile('image')) {
            if ($testimonial->image) Storage::disk('public')->delete($testimonial->image);
            $validated['image'] = $request->file('image')->store('testimonials', 'public');
        }
        $testimonial->update($validated);
        return redirect('/admin/testimonials')->with('success', 'Testimoni diperbarui!');
    }

    public function destroy(Testimonial $testimonial) {
        if ($testimonial->image) Storage::disk('public')->delete($testimonial->image);
        $testimonial->delete();
        return redirect('/admin/testimonials')->with('success', 'Testimoni dihapus!');
    }
}
