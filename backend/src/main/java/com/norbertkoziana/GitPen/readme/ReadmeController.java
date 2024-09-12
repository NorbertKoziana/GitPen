package com.norbertkoziana.GitPen.readme;

import com.norbertkoziana.GitPen.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
@RestController
@RequiredArgsConstructor
@RequestMapping("/readme")
public class ReadmeController {

    private final ReadmeService readmeService;

    @PostMapping("/github/{owner}/{repo}")
    public Integer createReadmeFromGithub
            (Authentication authentication, @PathVariable String owner, @PathVariable String repo)
    {
        return readmeService.createReadmeFromGithub(authentication, owner, repo);
    }

    @GetMapping("/user/me/{readmeId}")
    public ResponseEntity<String> getReadmeById(Authentication authentication, @PathVariable Integer readmeId){
        Readme readme = readmeService.getReadmeById(readmeId);

        if(!readme.getOwner().getGithubID().equals( ((User) authentication.getPrincipal() ).getGithubID() )){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(readme.getContent(), HttpStatus.OK);
    }
}
