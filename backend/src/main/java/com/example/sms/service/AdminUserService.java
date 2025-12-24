package com.example.sms.service;

import com.example.sms.dto.UserResponseDTO;
import com.example.sms.entity.User;
import com.example.sms.enums.Role;
import com.example.sms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;

    public List<UserResponseDTO> getUsers(Role role) {
        List<User> users = (role == null)
                ? userRepository.findAll()
                : userRepository.findByRole(role);

        return users.stream()
                .map(u -> new UserResponseDTO(u.getId(), u.getUsername(), u.getRole()))
                .toList();
    }
}
