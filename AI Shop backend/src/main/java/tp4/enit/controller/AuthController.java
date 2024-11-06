package tp4.enit.controller;

import tp4.enit.entity.User;
import tp4.enit.service.AuthService;  // Adjusted import statement to match the correct package
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return authService.registerUser(user.getUsername(), user.getPassword(), user.getEmail());
    }

    @PostMapping("/login")
    public boolean loginUser(@RequestBody User user) {
        Optional<User> authenticatedUser = authService.authenticateUser(user.getUsername(), user.getPassword());
        return authenticatedUser.isPresent() ? true : false; 
    }
}
