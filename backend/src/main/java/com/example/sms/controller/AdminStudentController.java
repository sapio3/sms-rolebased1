
package com.example.sms.controller;

import com.example.sms.dto.*;
import com.example.sms.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/students")
@RequiredArgsConstructor
public class AdminStudentController {

    private final StudentService studentService;

    @PostMapping
    public StudentResponseDTO create(@RequestBody StudentCreateDTO dto) {
        return studentService.createStudent(dto);
    }

    @GetMapping
    public List<StudentResponseDTO> list(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Integer year
    ) {
        return studentService.getStudents(name, department, year);
    }

    @GetMapping("/{id}")
    public StudentResponseDTO get(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PatchMapping("/{id}")
    public StudentResponseDTO patch(@PathVariable Long id, @RequestBody StudentPatchDTO dto) {
        return studentService.updateStudent(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}
