package com.bulletin_board.bulletin_board.service;

import com.bulletin_board.bulletin_board.domain.Member;
import com.bulletin_board.bulletin_board.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /**
     * Register
     */
    public void register(Member member) {
        // No duplicate email
        memberRepository.save(member);
        return;
    }

    /**
     * Check duplicate name
     */
    public boolean isNameUnique(String name) {
        Optional<Member> existingMember = memberRepository.findByName(name);
        return existingMember.isEmpty();
    }

    /**
     * Check duplicate email
     */
    public boolean isEmailUnique(String email) {
        Optional<Member> existingEmail = memberRepository.findByEmail(email);
        return existingEmail.isEmpty();
    }
}
