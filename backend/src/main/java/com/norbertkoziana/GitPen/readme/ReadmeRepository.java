package com.norbertkoziana.GitPen.readme;
import com.norbertkoziana.GitPen.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ReadmeRepository extends JpaRepository<Readme, Integer> {
    Page<Readme> findAllByOwner(User owner, Pageable pageable);
}
