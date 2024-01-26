<?php

use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Models\Comment;
use App\Models\Like;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("blog-posts/like", [LikeController::class, "store"]);

Route::get("blog-posts/{postId}/comments", function ($postId) {
    $comments = Comment::where("postId", $postId);
    return response()->json($comments);
});

Route::get("blog-posts/{postId}/likes", function ($postId) {
    $like_count = Like::where("postId", $postId)->count();
    return response()->json([
        "likes" => $like_count
    ]);
});


Route::apiResource("blog-posts/comment", CommentController::class);


Route::apiResource("blog-posts", BlogPostController::class);

require __DIR__ . '/auth.php';
