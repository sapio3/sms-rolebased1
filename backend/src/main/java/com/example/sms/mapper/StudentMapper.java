
package com.example.sms.mapper;

import com.example.sms.dto.StudentResponseDTO;
import com.example.sms.entity.Student;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {

    public StudentResponseDTO toDTO(Student student) {
        return new StudentResponseDTO(
                student.getId(),
                student.getName(),
                student.getDepartment(),
                student.getYear(),
                student.getUser().getUsername()
        );
    }
}
