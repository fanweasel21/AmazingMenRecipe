package com.bulletin_board.bulletin_board.controller;

import com.bulletin_board.bulletin_board.domain.Member;
import com.bulletin_board.bulletin_board.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class LoginController {

    private final MemberService memberService;

    @Autowired
    public LoginController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/")  // root directory
    public String home() {
        return "login";
    }

    @PostMapping("/")
    public ResponseEntity<String> login(@RequestBody Member member) {
        try {
            if (memberService.login(member.getEmail(), member.getPassword())) {
                return ResponseEntity.ok("Login successful");
            } else {
                return ResponseEntity.ok("Incorrect email and/or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred (login)");
        }
    }

}
