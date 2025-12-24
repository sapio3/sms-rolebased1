package com.example.sms.controller;

import com.example.sms.dto.UserResponseDTO;
import com.example.sms.enums.Role;
import com.example.sms.service.AdminUserService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    public List<UserResponseDTO> getUsers(
            @RequestParam(required = false) Role role
    ) {
        return adminUserService.getUsers(role);
    }
}
