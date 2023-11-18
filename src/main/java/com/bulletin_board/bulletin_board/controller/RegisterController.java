package com.bulletin_board.bulletin_board.controller;

import com.bulletin_board.bulletin_board.domain.Member;
import com.bulletin_board.bulletin_board.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RegisterController {
    private final MemberService memberService;

    @Autowired
    public RegisterController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/new") // register new user
    public String register() {
        return "register";
    }

    @PostMapping("/new/check-duplicate-name")
    @ResponseBody
    public ResponseEntity<String> checkDuplicateName(@RequestParam String name) {
        boolean isUnique = memberService.isNameUnique(name);
        if (isUnique) return ResponseEntity.ok("Valid name");
        else return ResponseEntity.status(HttpStatus.CONFLICT).body("Name already exists");
    }

    @PostMapping("/new/check-duplicate-email")
    @ResponseBody
    public ResponseEntity<String> checkDuplicateEmail(@RequestParam String email) {
        boolean isUnique = memberService.isEmailUnique(email);
        if (isUnique) return ResponseEntity.ok("Valid email");
        else return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
    }

    @PostMapping("/new/submit")
    public String submitForm(@RequestParam String name, @RequestParam String email, @RequestParam String password) {
        Member member = new Member();
        member.setName(name);
        member.setEmail(email);
        member.setPassword(password);

        memberService.register(member);

        return "redirect:/";
    }
}
