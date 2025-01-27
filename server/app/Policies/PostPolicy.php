<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostPolicy
{
  
    public function modify(User $user, Post $post): Response
    {
        //allow if the user owns the post
        return $user->id === $post->user_id
            ? Response::allow()
            : Response::deny('You do not own this post!');
    }
}
