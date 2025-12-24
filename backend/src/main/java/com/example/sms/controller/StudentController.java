
package com.example.sms.controller;

import com.example.sms.dto.StudentPatchDTO;
import com.example.sms.dto.StudentResponseDTO;
import com.example.sms.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/me")
    public StudentResponseDTO me() {
        return studentService.getMyProfile();
    }

    @PatchMapping("/me")
    public StudentResponseDTO patch(@RequestBody StudentPatchDTO dto) {
        return studentService.updateMyProfile(dto);
    }
}
