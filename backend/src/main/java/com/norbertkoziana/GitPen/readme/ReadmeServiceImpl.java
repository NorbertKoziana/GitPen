package com.norbertkoziana.GitPen.readme;
import com.norbertkoziana.GitPen.githubAPI.GitHubApiService;
import com.norbertkoziana.GitPen.user.User;
import com.norbertkoziana.GitPen.user.UserRepository;
import jakarta.transaction.Transactional;
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
                .lastModified(LocalDateTime.now().withNano(0))
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

        return readmeRepository.findAllByOwner(ownerUser, PageRequest.of(pageNumber, 4, Sort.by(Sort.Direction.DESC, "lastModified")));
    }

    @Override
    public Readme getReadmeById(Integer readmeId) {
        return readmeRepository.findById(readmeId).orElseThrow();
    }

    @Override
    @Transactional
    public void updateReadmeContent(Integer readmeId, String content) {
        Readme updateReadme = readmeRepository.findById(readmeId)
                .orElseThrow();
        updateReadme.setContent(content);
        updateReadme.setLastModified(LocalDateTime.now().withNano(0));
    }

}
