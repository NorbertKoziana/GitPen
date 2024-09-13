package com.norbertkoziana.GitPen.readme;
import org.springframework.security.core.Authentication;
public interface ReadmeService {
    Integer createReadmeFromGithub(Authentication authentication, String owner, String repo);
    Integer createEmptyReadme(Authentication authentication);
    Readme getReadmeById(Integer readmeId);
}
