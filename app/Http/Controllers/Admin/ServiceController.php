<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index() {
        return Inertia::render('Admin/Service/Index', ['services' => Service::latest()->paginate(10)]);
    }

    public function create() {
        return Inertia::render('Admin/Service/Form');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:191',
            'icon' => 'required|string|max:191',
            'title' => 'required|string|max:191',
            'description' => 'required|string|max:191',
        ]);
        Service::create($validated);
        return redirect('/admin/services')->with('success', 'Layanan ditambahkan!');
    }

    public function edit(Service $service) {
        return Inertia::render('Admin/Service/Form', ['service' => $service]);
    }

    public function update(Request $request, Service $service) {
        $validated = $request->validate([
            'name' => 'required|string|max:191',
            'icon' => 'required|string|max:191',
            'title' => 'required|string|max:191',
            'description' => 'required|string|max:191',
        ]);
        $service->update($validated);
        return redirect('/admin/services')->with('success', 'Layanan diperbarui!');
    }

    public function destroy(Service $service) {
        $service->delete();
        return redirect('/admin/services')->with('success', 'Layanan dihapus!');
    }
}
