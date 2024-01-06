<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    ];

}
