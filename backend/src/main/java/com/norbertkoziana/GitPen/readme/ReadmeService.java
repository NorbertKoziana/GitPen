package com.norbertkoziana.GitPen.readme;
import org.springframework.security.core.Authentication;
public interface ReadmeService {
    Integer createReadmeFromGithub(Authentication authentication, String owner, String repo);
    Readme getReadmeById(Integer readmeId);
}
