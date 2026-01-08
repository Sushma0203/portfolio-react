<?php

namespace App\Http\Controllers\Admin;

 Ame;
use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        return response()->json(Gallery::latest()->paginate(12));
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('img/gallery'), $name);
            $path = 'img/gallery/' . $name;

            $gallery = Gallery::create([
                'image_path' => $path,
                'title' => $request->title,
            ]);
            
            return response()->json($gallery);
        }

        return response()->json(['message' => 'Image upload failed'], 400);
    }

    public function destroy($id)
    {
        $image = Gallery::findOrFail($id);
        if (file_exists(public_path($image->image_path))) {
            unlink(public_path($image->image_path));
        }
        $image->delete();

        return response()->json(['message' => 'Image deleted successfully']);
    }
}
