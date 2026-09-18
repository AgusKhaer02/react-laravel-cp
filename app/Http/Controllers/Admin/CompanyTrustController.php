<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\CompanyTrust;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CompanyTrustController extends Controller
{
    public function index() {
        return Inertia::render('Admin/CompanyTrust/Index', ['companyTrusts' => CompanyTrust::latest()->paginate(10)]);
    }

    public function create() {
        return Inertia::render('Admin/CompanyTrust/Form');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'linkUrl' => 'nullable|string|max:191',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        $validated['image'] = $request->file('image')->store('company-trusts', 'public');
        CompanyTrust::create($validated);
        return redirect('/admin/company-trusts')->with('success', 'Data berhasil ditambahkan!');
    }

    public function edit(CompanyTrust $companyTrust) {
        return Inertia::render('Admin/CompanyTrust/Form', ['companyTrust' => $companyTrust]);
    }

    public function update(Request $request, CompanyTrust $companyTrust) {
        $validated = $request->validate([
            'linkUrl' => 'nullable|string|max:191',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        if ($request->hasFile('image')) {
            if ($companyTrust->image) Storage::disk('public')->delete($companyTrust->image);
            $validated['image'] = $request->file('image')->store('company-trusts', 'public');
        }
        $companyTrust->update($validated);
        return redirect('/admin/company-trusts')->with('success', 'Data berhasil diperbarui!');
    }

    public function destroy(CompanyTrust $companyTrust) {
        if ($companyTrust->image) Storage::disk('public')->delete($companyTrust->image);
        $companyTrust->delete();
        return redirect('/admin/company-trusts')->with('success', 'Data berhasil dihapus!');
    }
}
