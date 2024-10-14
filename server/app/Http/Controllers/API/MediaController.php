<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $media = Media::latest()->get();
            return $this->sendResponse($media, 'Media retrieved successfully');
        } catch (\Throwable $th) {
            return $this->sendError('Error retrieving media', $th->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'file' => 'required|mimes:jpg,jpeg,png,bmp,svg|max:1024',
                'role' => 'required|in:admin,user',
                'user_id' => 'required|exists:users,id'
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation failed', $validator->errors(), 422);
            }

            $file = $request->file('file');
            $originalFiles = $file->getClientOriginalName();
            $file_name = Str::slug(pathinfo($originalFiles, PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            $file_path = $file->storeAs('uploads/user-' . $request->user_id, $file_name, 'public');

            $media = Media::create([
                'user_id' => $request->user_id,
                'filename' => $file_name,
                'filepath' => $file_path,
                'role' => $request->role,
                'url' => asset(path: 'storage/' . $file_path),
                'ext' => $file->getClientOriginalExtension(),
            ]);

            return $this->sendResponse($media, 'Upload file successfully');
        } catch (\Throwable $th) {
            return $this->sendError('Error storing media', $th->getMessage());
        }
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

        return $this->sendResponse($media, 'Media deleted successfully');
    }
}
