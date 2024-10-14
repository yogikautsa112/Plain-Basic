<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $rolesQuery = Role::query();
        $rolesQuery->when($request->search, function ($query, $search) {
            $query->where('name', 'LIKE', '%' . $search . '%')
                ->orWhere('display_name', 'LIKE', '%' . $search . '%');
        });
        $roles = $rolesQuery->paginate(2);
        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Roles/Menage');
    }

    public function store(Request $request)
    {
        // Validasi
        $request->validate([
            'name' => 'required|max:255|unique:roles,name',
            'display_name' => 'required|max:255'
        ]);
        // Nyimpan ke database dan membuat flash message
        Role::create($request->all());
        return redirect()->route('dashboard.roles.index')->with('success', 'Role created successfully');
    }

    public function show() {}

    public function edit(string $id)
    {
        $role = Role::findOrFail($id);

        return Inertia::render('Admin/Roles/Menage', ['role' => $role]);
    }

    public function update(Request $request, string $id)
    {
        // validate role
        $request->validate([
            'name' => 'max:255|unique:roles,name,' . $id,
            'display_name' => 'max:255'
        ]);

        // update role
        $role = Role::findOrFail($id);
        $role->update($request->all());

        return redirect()->route('dashboard.roles.index')->with('success', 'Role updated successfully');
    }

    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return redirect()->route('dashboard.roles.index')->with('success', 'Role deleted successfully');
    }
}
