<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AboutUsController extends Controller
{
    public function edit() {
        // Ambil data pertama, jika kosong kembalikan null untuk inisiasi
        $aboutUs = AboutUs::first();
        return Inertia::render('Admin/AboutUs/Form', ['aboutUs' => $aboutUs]);
    }

    public function update(Request $request) {
        $aboutUs = AboutUs::first();

        $validated = $request->validate([
            'companyName' => 'required|string|max:191',
            'title' => 'required|string|max:191',
            'subtitle' => 'required|string|max:191',
            'description' => 'required|string|max:191',
            'logoCompany' => 'nullable|image|max:2048',
            'imageBanner' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logoCompany')) {
            if ($aboutUs && $aboutUs->logoCompany) Storage::disk('public')->delete($aboutUs->logoCompany);
            $validated['logoCompany'] = $request->file('logoCompany')->store('about', 'public');
            // $validated['logoCompany'] = Storage::disk('public')->putFile('about', $request->file('logoCompany'));
        }

        if ($request->hasFile('imageBanner')) {
            if ($aboutUs && $aboutUs->imageBanner) Storage::disk('public')->delete($aboutUs->imageBanner);
            $validated['imageBanner'] = $request->file('imageBanner')->store('about', 'public');

        }

        if ($aboutUs) {
            $aboutUs->update($validated);
        } else {
            AboutUs::create($validated);
        }

        return redirect('/admin/about-us')->with('success', 'Profil perusahaan berhasil diperbarui!');
    }
}
