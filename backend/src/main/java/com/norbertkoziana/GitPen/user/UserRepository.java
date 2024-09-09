package com.norbertkoziana.GitPen.user;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByGithubID(Integer githubID);
}
