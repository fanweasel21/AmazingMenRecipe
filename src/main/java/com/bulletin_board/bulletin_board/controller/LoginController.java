package com.bulletin_board.bulletin_board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/")  // root directory
    public String login() {
        return "login";
    }

    @GetMapping("/new") // register new user
    public String register() {
        return "register";
    }
}
