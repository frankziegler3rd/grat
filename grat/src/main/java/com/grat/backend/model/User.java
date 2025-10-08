/**
 * grat – senior project
 * user model
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

import java.util.UUID;

@Document(collection = "users")
public class User {
    @Id
    private UUID id;

    @Field(name = "fname")
    private String fname;

    @Field(name = "lname")
    private String lname;

    @Field(name = "email")
    private String email;

    @Field(name = "hpass")
    private String hPass;

    public User(UUID id, String fname, String lname, String email, String hPass) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.hPass = hPass;
    }

    public String getId() { return id; }

    public void setId(UUID id) { this.id = id; }

    public String getFname() { return fname; }

    public void setFname(String fname) { this.fname = fname; }

    public String getLname() { return Lname; }

    public void setLname(String Lname) { this.Lname = Lname; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getHpassword() { return hPass; }

    public void setHpassword(String hPass) { this.hPass = hPass; }
}