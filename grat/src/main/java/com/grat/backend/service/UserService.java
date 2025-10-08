/**
 * grat – senior project
 * user services
 * 
 * @author frank ziegler
 * @version 1.0.0
 */


@Service
public class UserService {

    private final PasswordEncoder passEncoder;
    private final UserRepo userRepo;

    @Autowired
    public UserService(PasswordEncoder passEncoder, UserRepo userRepo) {
        this.passEncoder = passEncoder;
        this.userRepo = userRepo;
    }

    public boolean authenticateUser(String email, String rawPass) {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            return false;
        }
        return passEncoder.matches(rawPass, user.getHpassword());
    }

    public User registerUser(UUID id, String fname, String lname, String email, String password) {
        User user = null;
        if (userRepo.findByEmail(email) == null) {
            user = new User(id, fname, lname, email, passEncoder.encode(password));
            userRepo.save(user);
        }
        return user;
    }
}