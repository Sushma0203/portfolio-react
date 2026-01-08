<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return response()->json(Contact::latest()->paginate(10));
    }

    public function show($id)
    {
        $message = Contact::findOrFail($id);
        if (!$message->is_read) {
            $message->update(['is_read' => true]);
        }
        return response()->json(['message' => $message]);
    }

    public function destroy($id)
    {
        Contact::findOrFail($id)->delete();
        return response()->json(['message' => 'Message deleted successfully']);
    }
}
