<?php

namespace App\Http\Controllers;

use App\Models\BlogPostModel;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $posts = BlogPostModel::all();
        return response()->json($posts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //


        $post_name = $request->input('name');

        $slug = str_replace(' ', '-', strtolower($post_name));

        $newPost = [
            "name" => $post_name,
            "slug" => $slug,
            "image_url" => $request->input('image_url'),
            "content" => json_encode($request->input('content')),
        ];

        echo json_encode($newPost);

        $post = BlogPostModel::create($newPost);

        return response()->json($post);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $post = BlogPostModel::find($id);
        return response()->json($post);
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
        //
    }
}
