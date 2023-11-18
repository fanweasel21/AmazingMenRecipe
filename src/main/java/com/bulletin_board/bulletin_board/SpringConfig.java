package com.bulletin_board.bulletin_board;

import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;

public class SpringConfig {
    EntityManager em;

    @Autowired
    public SpringConfig(EntityManager em) {
        this.em = em;
    }
}
