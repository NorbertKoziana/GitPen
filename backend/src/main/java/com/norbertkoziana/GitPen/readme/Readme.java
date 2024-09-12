package com.norbertkoziana.GitPen.readme;

import com.norbertkoziana.GitPen.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Readme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(columnDefinition="TEXT")
    private String content;
    private LocalDateTime lastModified;

    @ManyToOne
    @JoinColumn
    private User owner;
}
