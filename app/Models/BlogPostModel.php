<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BlogPostModel extends Model
{
    use HasFactory;

    protected $table = "blog-posts";
    protected $primaryKey = "id";

    protected $fillable = [
        "name",
        "image_url",
        "slug",
        "content",
        "user_id",
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, "id", "user_id");
    }

    public function likes(): HasMany
    {
        return $this->hasMany(Like::class, "blog_post_id", "id");
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, "blog_post_id", "id");
    }
}
