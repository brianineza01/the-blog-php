<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('index');
    }

    /**
     * Likes and unlikes a post
     */
    public function store(Request $request)
    {
        $user_id = $request->user()->id;
        $blog_post_id = $request->input("blog_post_id");

        $blog_post_id = $request->input("blog_post_id");
        $likeRecord = Like::where("user_id", $user_id)
            ->where("blog_post_id", $blog_post_id)
            ->first();

        if ($likeRecord !== null) {
            $likeRecord->delete();
            return response()->json([
                "status" => "success",
                "type" => "liked",
                "message" => "Like deleted",
            ]);
        }
        $like = Like::create([
            "user_id" => $user_id,
            "blog_post_id" => $blog_post_id,
        ]);
        return response()->json(["status" => "success", "like" => $like, "message" => "unliked"]);
    }
}
