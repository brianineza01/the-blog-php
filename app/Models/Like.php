<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Like extends Model
{
    use HasFactory;

    protected $table = "likes";
    protected $primaryKey = "id";

    protected $fillable = [
        "user_id",
        "blog_post_id",
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, "id", "user_id");
    }

    public function blogPost(): HasOne
    {
        return $this->hasOne(BlogPostModel::class, "id", "blog_post_id");
    }

}
