
package com.example.sms.dto;

import lombok.Data;

@Data
public class StudentCreateDTO {
    private String name;
    private String department;
    private Integer year;
    private Long userId;
}
