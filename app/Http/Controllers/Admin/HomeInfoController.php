<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeInfo;
use Illuminate\Http\Request;

class HomeInfoController extends Controller
{
    public function edit()
    {
        $info = HomeInfo::firstOrCreate([]);
        return response()->json(['info' => $info]);
    }

    public function update(Request $request)
    {
        $info = HomeInfo::first();
        $request->validate([
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'hero_title' => 'required|string|max:255',
            'typed_strings' => 'required|array',
        ]);

        if ($request->hasFile('profile_image')) {
            if ($info->profile_image && file_exists(public_path($info->profile_image))) {
                unlink(public_path($info->profile_image));
            }
            $image = $request->file('profile_image');
            $name = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('img'), $name);
            $info->profile_image = 'img/' . $name;
        }

        $info->update([
            'hero_title' => $request->hero_title,
            'typed_strings' => $request->typed_strings,
        ]);

        return response()->json(['info' => $info, 'message' => 'Home info updated']);
    }
}
