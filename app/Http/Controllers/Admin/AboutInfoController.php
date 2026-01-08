<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutInfo;
use Illuminate\Http\Request;

class AboutInfoController extends Controller
{
    public function edit()
    {
        $info = AboutInfo::firstOrCreate([]);
        return response()->json(['info' => $info]);
    }

    public function update(Request $request)
    {
        $info = AboutInfo::first();
        $request->validate([
            'career_objective' => 'required|string',
            'technical_skills' => 'required|array',
            'soft_skills' => 'required|array',
            'achievements' => 'nullable|array',
        ]);

        $info->update([
            'career_objective' => $request->career_objective,
            'technical_skills' => $request->technical_skills,
            'soft_skills' => $request->soft_skills,
            'achievements' => $request->achievements,
        ]);

        return response()->json(['info' => $info, 'message' => 'About info updated']);
    }
}
