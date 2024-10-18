<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $categoriesQuery = Category::query();
        $categoriesQuery->when($request->search, function ($query, $search) {
            $query->where('title', 'LIKE', '%' . $search . '%');
        });
        $categories = $categoriesQuery->paginate(2);
        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
        $categories = Category::all();
        return Inertia::render('Admin/Categories/Menage', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'title' => 'required|max:255|unique:categories',
            'slug' => 'required|max:255|unique:categories',
            'media_url' => 'required'
        ], [
            'title' => 'Title is required',
            'slug' => 'Slug is required',
            'media_url' => 'Media is required'
        ]);

        $request = Category::create($request->all());

        return redirect()->route('dashboard.categories.index')->with('success', "Category created successfully");
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
        $category = Category::findOrFail($id);

        return Inertia::render('Admin/Categories/Menage', ['category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $category = Category::findOrFail($id);
        
        $category->delete();

        session()->flash('success', value:'Category has been deleted');

        return redirect()->route(route: 'dashboard.categories.index');
    }
}
