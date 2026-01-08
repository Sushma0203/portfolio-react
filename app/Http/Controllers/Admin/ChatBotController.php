<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChatBotQuestion;
use Illuminate\Http\Request;

class ChatBotController extends Controller
{
    public function index()
    {
        return response()->json(['responses' => ChatBotQuestion::all()]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);
        $rule = ChatBotQuestion::create($request->all());
        return response()->json($rule);
    }

    public function edit($id)
    {
        return response()->json(['response' => ChatBotQuestion::findOrFail($id)]);
    }

    public function update(Request $request, $id)
    {
        $rule = ChatBotQuestion::findOrFail($id);
        $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);
        $rule->update($request->all());
        return response()->json($rule);
    }

    public function destroy($id)
    {
        ChatBotQuestion::findOrFail($id)->delete();
        return response()->json(['message' => 'Rule deleted']);
    }
}
