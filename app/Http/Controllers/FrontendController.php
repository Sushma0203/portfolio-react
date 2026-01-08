<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HomeInfo;
use App\Models\AboutInfo;
use App\Models\Gallery;
use App\Models\Project;

class FrontendController extends Controller
{
    public function home()
    {
        $info = HomeInfo::first() ?? new HomeInfo([
            'hero_title' => "Hello, I'm Sushma Thapa",
            'hero_subtitle' => "Laravel Developer",
            'typed_strings' => ["Laravel Developer", "Frontend Designer", "Tech Enthusiast"],
            'profile_image' => 'img/profile.jpg', // Default image if not in DB
        ]);
        return response()->json(['info' => $info]);
    }

    public function about()
    {
        $info = AboutInfo::first() ?? new AboutInfo([
            'career_objective' => "To commit a professional job utilizing my field of study and gain work experience for future assiduous.",
            'technical_skills' => ['Programming', 'Tools', 'Software'],
            'soft_skills' => ['Communication', 'Teamwork'],
            'achievements' => ['Scholarships & GPA honors', 'Volunteer work', 'Leadership roles']
        ]);
        return response()->json(['info' => $info]);
    }

    public function contact()
    {
        return response()->json(['status' => 'ready']);
    }

    public function gallery()
    {
        $images = Gallery::latest()->get();

        if ($images->isEmpty()) {
            $localImages = glob(public_path('img/gallery/*.{jpg,png,jpeg,gif}'), GLOB_BRACE);
            $images = collect($localImages)->map(function ($img) {
                $imgUrl = str_replace(public_path(), '', $img);
                // Windows path fix if needed, but this is Mac.
                return (object)[
                    'image_path' => $imgUrl,
                    'title' => 'Gallery Image'
                ];
            });
        }

        return response()->json(['images' => $images]);
    }

    public function projects()
    {
        $projects = Project::latest()->get();
        
        if ($projects->isEmpty()) {
            $projects = collect([
                ['title'=>'Brain Champ','img'=>'brainchamp.jpeg','desc'=>'C-based quiz game with interactive learning features.','category'=>'c','tech_stack'=>['C']],
                ['title'=>'Traffic Management System','img'=>'trafficmanagementsystem.jpeg','desc'=>'Real-time traffic control system using HTML, CSS, JS, and PHP.','category'=>'js','tech_stack'=>['HTML','CSS','JS','PHP']],
                ['title'=>'Harati Webpage','img'=>'haratiwebpage.jpeg','desc'=>'Built using HTML, CSS, JS, PHP and Python for digital billing.','category'=>'js','tech_stack'=>['HTML','CSS','JS','PHP','Python']],
                ['title'=>'.NET Core Website','img'=>'dotnet.png','desc'=>'Full website built using .NET Core framework.','category'=>'dotnet','tech_stack'=>['.NET Core']],
                ['title'=>'Inventory Management','img'=>'inventory.jpeg','desc'=>'Python + HTML/CSS/JS/PHP system with CRUD and billing.','category'=>'python','tech_stack'=>['Python','HTML','CSS','JS','PHP']],
                ['title'=>'Gold Shop Chatbot','img'=>'goldshop.jpeg','desc'=>'Python + HTML/CSS/JS/PHP interactive chatbot.','category'=>'python','tech_stack'=>['Python','HTML','CSS','JS','PHP']],
                ['title'=>'Employee Login System','img'=>'employeelogin.png','desc'=>'Python + HTML/CSS/JS/PHP secure login and dashboard.','category'=>'python','tech_stack'=>['Python','HTML','CSS','JS','PHP']],
                ['title'=>'Portfolio','img'=>'portfolio.jpeg','desc'=>'Laravel-based portfolio site.','category'=>'laravel','tech_stack'=>['Laravel']],
                ['title'=>'Harati System','img'=>'haratisystem.jpeg','desc'=>'Laravel-based inventory and billing system.','category'=>'laravel','tech_stack'=>['Laravel']],
            ])->map(function($p) {
                return (object)[
                    'title' => $p['title'],
                    'image_path' => 'img/project/'.$p['img'],
                    'description' => $p['desc'],
                    'category' => $p['category'],
                    'tech_stack' => $p['tech_stack']
                ];
            });
        }

        return response()->json(['projects' => $projects]);
    }
}
