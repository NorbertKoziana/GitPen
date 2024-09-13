package com.norbertkoziana.GitPen.readme;
import com.norbertkoziana.GitPen.githubAPI.GitHubApiService;
import com.norbertkoziana.GitPen.user.User;
import com.norbertkoziana.GitPen.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReadmeServiceImpl implements ReadmeService{

    private final GitHubApiService gitHubApiService;

    private final ReadmeRepository readmeRepository;

    private final UserRepository userRepository;

    private Integer createReadmeForAuthenticatedUser(Authentication authentication, String userReadme){
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
    public Integer createReadmeFromGithub(Authentication authentication, String owner, String repo) {

        String userReadme = gitHubApiService.getRepositoryReadme(authentication, owner, repo).block();

        return createReadmeForAuthenticatedUser(authentication, userReadme);
    }
    @Override
    public Integer createEmptyReadme(Authentication authentication) {
        return createReadmeForAuthenticatedUser(authentication, "");
    }
    @Override
    public Page<Readme> getAllReadmesWithPagination(Authentication authentication, Integer pageNumber) {
        User ownerUser = userRepository.findByGithubID( ( (User) authentication.getPrincipal() ).getGithubID() )
                .orElseThrow();

        return readmeRepository.findAllByOwner(ownerUser, PageRequest.of(pageNumber, 2, Sort.by(Sort.Direction.DESC, "lastModified")));
    }

    @Override
    public Readme getReadmeById(Integer readmeId) {
        return readmeRepository.findById(readmeId).orElseThrow();
    }
}
