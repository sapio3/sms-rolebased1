
package com.example.sms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentResponseDTO {
    private Long id;
    private String name;
    private String department;
    private Integer year;
    private String username;
}
