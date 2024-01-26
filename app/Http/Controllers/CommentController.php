<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth')->except('index');
    }

    /**
     * Store a newly comment into the db
     */
    public function store(Request $request)
    {
        //
        $user_id = $request->user()->id;
        $blog_post_id = $request->input("blog_post_id");
        $content = $request->input("content");
        $comment = Comment::create([
            "user_id" => $user_id,
            "blog_post_id" => $blog_post_id,
            "content" => $content,
        ]);
        return response()->json($comment);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //

        $user_id = $request->user()->id;
        $blog_post_id = $request->input("blog_post_id");
        $content = $request->input("content");
        $comment = Comment::where("id", $id)->update([
            "user_id" => $user_id,
            "blog_post_id" => $blog_post_id,
            "content" => $content,
        ]);

        return response()->json($comment);
    }

    /**
     * Remove the specified comment from db.
     */
    public function destroy(string $id)
    {
        $comment = Comment::destroy($id);
        return response()->json($comment);
    }
}
