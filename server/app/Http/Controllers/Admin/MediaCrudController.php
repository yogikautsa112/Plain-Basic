<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Media;

class MediaCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $media = Media::latest()->paginate(10);
        return Inertia::render('Admin/Media/Index', [
            'media' => $media
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        $media = Media::findOrFail($id);

        if (!$media) {
            return $this->sendError('Media not found');
        }

        $file_path = str_replace('storage/', '', $media->filepath);
        $file_path = storage_path('app/public/' . $file_path);

        if (file_exists($file_path)) {
            unlink($file_path);
        }

        $media->delete();

        session()->flash('success', 'Media deleted successfully');

        return redirect()->route('dashboard.media.index');
    }
}
