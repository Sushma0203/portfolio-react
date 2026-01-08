<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(Project::latest()->paginate(10));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required',
            'category' => 'required|string',
            'tech_stack' => 'required|array',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('img/project'), $name);
            $path = 'img/project/' . $name;
        }

        $project = Project::create([
            'title' => $request->title,
            'image_path' => $path,
            'description' => $request->description,
            'category' => $request->category,
            'tech_stack' => $request->tech_stack,
        ]);

        return response()->json($project);
    }

    public function show($id)
    {
        return response()->json(['project' => Project::findOrFail($id)]);
    }

    public function edit($id)
    {
        return response()->json(['project' => Project::findOrFail($id)]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required',
            'category' => 'required|string',
            'tech_stack' => 'required|array',
        ]);

        if ($request->hasFile('image')) {
            if ($project->image_path && file_exists(public_path($project->image_path))) {
                unlink(public_path($project->image_path));
            }
            $image = $request->file('image');
            $name = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('img/project'), $name);
            $project->image_path = 'img/project/' . $name;
        }

        $project->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'tech_stack' => $request->tech_stack,
        ]);

        return response()->json($project);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        if ($project->image_path && file_exists(public_path($project->image_path))) {
            unlink(public_path($project->image_path));
        }
        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }
}
