package com.bulletin_board.bulletin_board.repository;

import com.bulletin_board.bulletin_board.domain.Post;

import java.util.Optional;

public interface PostRepository {
    Post save(Post post);
    Optional<Post> findById(Long post_id);
}
