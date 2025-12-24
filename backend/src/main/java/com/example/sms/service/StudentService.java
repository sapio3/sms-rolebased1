
package com.example.sms.service;

import com.example.sms.dto.*;
import com.example.sms.entity.Student;
import com.example.sms.entity.User;
import com.example.sms.mapper.StudentMapper;
import com.example.sms.provider.StudentProvider;
import com.example.sms.repository.StudentRepository;
import com.example.sms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final StudentProvider studentProvider;
    private final StudentMapper mapper;

    // ADMIN

    public StudentResponseDTO createStudent(StudentCreateDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Student student = new Student(null, dto.getName(), dto.getDepartment(), dto.getYear(), user);
        return mapper.toDTO(studentRepository.save(student));
    }

    public List<StudentResponseDTO> getStudents(String name, String department, Integer year) {
        return studentRepository.findAll().stream()
                .filter(s -> name == null || s.getName().toLowerCase().contains(name.toLowerCase()))
                .filter(s -> department == null || s.getDepartment().equals(department))
                .filter(s -> year == null || s.getYear().equals(year))
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public StudentResponseDTO getStudentById(Long id) {
        return mapper.toDTO(studentProvider.getOrThrow(id));
    }

    public StudentResponseDTO updateStudent(Long id, StudentPatchDTO dto) {
        Student student = studentProvider.getOrThrow(id);

        if (dto.getName() != null) student.setName(dto.getName());
        if (dto.getDepartment() != null) student.setDepartment(dto.getDepartment());
        if (dto.getYear() != null) student.setYear(dto.getYear());

        return mapper.toDTO(studentRepository.save(student));
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // STUDENT

    public StudentResponseDTO getMyProfile() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Student student = studentRepository.findByUserUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));
        return mapper.toDTO(student);
    }

    public StudentResponseDTO updateMyProfile(StudentPatchDTO dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Student student = studentRepository.findByUserUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        if (dto.getName() != null) student.setName(dto.getName());
        if (dto.getDepartment() != null) student.setDepartment(dto.getDepartment());
        if (dto.getYear() != null) student.setYear(dto.getYear());

        return mapper.toDTO(studentRepository.save(student));
    }
}
