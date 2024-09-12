package com.norbertkoziana.GitPen.readme;
import com.norbertkoziana.GitPen.githubAPI.GitHubApiService;
import com.norbertkoziana.GitPen.user.User;
import com.norbertkoziana.GitPen.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReadmeServiceImpl implements ReadmeService{

    private final GitHubApiService gitHubApiService;

    private final ReadmeRepository readmeRepository;

    private final UserRepository userRepository;

    @Override
    public Integer createReadmeFromGithub(Authentication authentication, String owner, String repo) {

        String userReadme = gitHubApiService.getRepositoryReadme(authentication, owner, repo).block();

        User ownerUser = userRepository.findByGithubID( ( (User) authentication.getPrincipal() ).getGithubID() )
                .orElseThrow();

        Readme readme = Readme.builder()
                .content(userReadme)
                .lastModified(LocalDateTime.now())
                .owner(ownerUser)
                .build();

        return readmeRepository.save(readme).getId();
    }
    @Override
    public Readme getReadmeById(Integer readmeId) {
        return readmeRepository.findById(readmeId).orElseThrow();
    }
}
