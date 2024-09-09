package com.norbertkoziana.GitPen.githubAPI;
import org.springframework.security.core.Authentication;
public interface GitHubApiService {
    String getAccessToken(Authentication authentication);
}
