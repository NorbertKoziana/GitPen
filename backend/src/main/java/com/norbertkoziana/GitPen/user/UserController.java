package com.norbertkoziana.GitPen.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    @GetMapping("/info")
    User getUserInfo(@AuthenticationPrincipal User user){
        return user;
    }

}