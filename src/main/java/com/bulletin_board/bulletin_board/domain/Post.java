package com.bulletin_board.bulletin_board.domain;

import jakarta.persistence.*;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String contents;
    private Long id;
    private String time;
}
