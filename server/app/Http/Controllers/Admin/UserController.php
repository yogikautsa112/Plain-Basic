<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userQuery = User::query();
        $userQuery->when($request->search, function ($query, $search) {
            $query->where('name', 'LIKE', '%' . $search . '%')
                ->orWhere('email', 'LIKE', '%' . $search . '%');
        });

        $userQuery->when($request->sortField, function ($query, $sortField) use($request){
            $query->orderBy($sortField, $request->sortDirection ? $request->sortDirection : 'asc');
        });

        $users = $userQuery->with('roles')->paginate(2);

        return Inertia::render('Admin/Users/Index', props: [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $roles = Role::all();

        return Inertia::render('Admin/Users/Menage', ['roles' => $roles]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|max:255|unique:users,email|email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password'
        ]);

        $user = User::create(
            array_merge($request->only('name', 'email'), ['password' => bcrypt($request->password)])
        );

        $user->syncRoles($request->roles);

        session()->flash('success', 'User had been created successfully');

        return redirect()->route(route: 'dashboard.users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $user = User::with('roles')->findOrFail($id);
        $roles = Role::all();

        return Inertia::render('Admin/Users/Menage', ['user' => $user, 'roles' => $roles]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        // Validate user
        $request->validate([
            'name' =>  'max:255',
            // 'email' => '|max:255|email|unique:users,email,'. $id,
            'password' => 'nullable|min:8',
            'password_confirmation' => 'nullable|same:password'
        ], [
            'password.min' => 'Password must be at least 8 characters long',
            'password_confirmation.same' => 'Password confirmation does not match'
        ]);

        // Ngedapetion data si user nya
        $user = User::findOrFail($id);
        
        $password = $user->password;
        if($request->password && $request-> password_confirmation) {
            $password = bcrypt($request->password);
        }

        // Update si user nya
        $user->update(
            array_merge($request->only('name'), ['password' => $password])
        );

        // Update roles di user nya
        $user->syncRoles($request->roles);

        // Simpan perubahan di database
        $user->save();


        session()->flash('success', 'User has been updated');

        return redirect()->route(route: 'dashboard.users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $user = User::findOrFail($id);
        
        $user->delete();

        session()->flash('success', 'User has been deleted');

        return redirect()->route(route: 'dashboard.users.index');
    }
}
