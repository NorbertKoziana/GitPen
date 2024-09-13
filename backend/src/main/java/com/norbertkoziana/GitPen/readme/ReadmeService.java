package com.norbertkoziana.GitPen.readme;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;

import java.util.List;
public interface ReadmeService {
    Integer createReadmeFromGithub(Authentication authentication, String owner, String repo);
    Integer createEmptyReadme(Authentication authentication);
    Page<Readme> getAllReadmesWithPagination(Authentication authentication, Integer pageNumber);
    Readme getReadmeById(Integer readmeId);
}
