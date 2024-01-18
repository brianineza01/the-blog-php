<?php

namespace App\Http\Controllers;

use App\Models\BlogPostModel;
use Illuminate\Http\Request;


use Supabase\Storage\StorageFile;




class BlogPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    private $SUPABASE_URL;
    private $SUPABASE_KEY;
    private $SUPABASE_BUCKET;
    private $SUPABASE_REFERENCE_ID;

    public function __construct()
    {
        $this->SUPABASE_URL = env('SUPABASE_URL');
        $this->SUPABASE_KEY = env('SUPABASE_KEY');
        $this->SUPABASE_BUCKET = env('SUPABASE_BUCKET');
        $this->SUPABASE_REFERENCE_ID = env('SUPABASE_REFERENCE_ID');
    }

    public function index()
    {
        //
        $cols = [
            "name",
            "slug",
            "image_url",
            'created_at',
        ];
        $posts = BlogPostModel::all($cols);
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
        $post_name = $request->input('name');
        $slug = str_replace(' ', '-', strtolower($post_name));

        $image_contents = $request->file('image')->get();

        $storage_instance = new StorageFile($this->SUPABASE_KEY, $this->SUPABASE_REFERENCE_ID, $this->SUPABASE_BUCKET);

        $storage_instance->upload("blogpost/" . $slug, $image_contents, ['contentType' => 'image/png', "public" => true]);

        $img_url = $storage_instance->getPublicUrl("blogpost/" . $slug, ['download' => true]);

        echo $img_url;

        $newPost = [
            "name" => $post_name,
            "slug" => $slug,
            "image_url" => $img_url,
            "content" => json_encode($request->input('content')),
        ];

        echo json_encode($newPost);

        $post = BlogPostModel::create($newPost);

        return response()->json($post);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $post = BlogPostModel::where('slug', $slug)->first();
        return response()->json($post);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
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
