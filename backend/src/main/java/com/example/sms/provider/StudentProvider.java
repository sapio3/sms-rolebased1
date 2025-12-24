
package com.example.sms.provider;

import com.example.sms.entity.Student;
import com.example.sms.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StudentProvider {

    private final StudentRepository repository;

    public Student getOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));
    }
}
