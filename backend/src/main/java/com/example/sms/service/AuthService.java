
package com.example.sms.service;

import com.example.sms.dto.LoginDTO;
import com.example.sms.dto.UserCreateDTO;
import com.example.sms.entity.User;
import com.example.sms.repository.UserRepository;
import com.example.sms.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public void register(UserCreateDTO dto) {
        userRepository.save(new User(null, dto.getUsername(), dto.getPassword(), dto.getRole()));
    }

    public String login(LoginDTO dto) {
        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!user.getPassword().equals(dto.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        return jwtUtil.generate(user.getUsername(), user.getRole().name());
    }
}
