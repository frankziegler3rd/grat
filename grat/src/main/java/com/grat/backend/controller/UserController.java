
/**
 * grat – senior project
 * user controller
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class UserController {

    private UserService userService;

    @PostMapping("/login")
    
}